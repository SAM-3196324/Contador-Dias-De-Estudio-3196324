export const KOTLIN_FILES = {
  mainActivity: `package com.racha.app

import android.content.Context
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Whatshot
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.racha.app.ui.theme.NeonGreen
import com.racha.app.ui.theme.NeonCyan
import com.racha.app.ui.theme.DarkBackground
import com.racha.app.ui.theme.CardBackground
import com.racha.app.ui.theme.RachaTheme
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.TextStyle
import java.util.Locale

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            RachaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = DarkBackground
                ) {
                    RachaScreen()
                }
            }
        }
    }
}

val QUOTES = listOf(
    "No estudies para saber una cosa más, sino para saberla mejor." to "Séneca",
    "La disciplina tarde o temprano vencerá a la inteligencia." to "Proverbio Japonés",
    "Un día a la vez. Cada sesión de estudio es un ladrillo en tu futuro." to "RACHA",
    "Somos lo que hacemos repetidamente. La excelencia es un hábito." to "Aristóteles",
    "El dolor de la disciplina pesa gramos; el del arrepentimiento, toneladas." to "Jim Rohn",
    "No tienes que ser extremo, solo tienes que ser consistente." to "James Clear",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día." to "Robert Collier",
    "La suerte favorece a la mente preparada y disciplinada." to "Louis Pasteur"
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RachaScreen() {
    val context = LocalContext.current
    val sharedPrefs = remember { context.getSharedPreferences("racha_prefs", Context.MODE_PRIVATE) }

    // Fechas guardadas en el teléfono (formato YYYY-MM-DD)
    var studyDates by remember {
        mutableStateOf(sharedPrefs.getStringSet("study_dates", emptySet()) ?: emptySet())
    }

    val todayStr = remember { LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE) }
    val hasStudiedToday = studyDates.contains(todayStr)

    // Cálculo de racha consecutiva
    val currentStreak = remember(studyDates) {
        calculateCurrentStreak(studyDates)
    }

    // Frase motivacional aleatoria
    var currentQuoteIndex by remember { mutableIntStateOf((0..QUOTES.lastIndex).random()) }

    fun vibratePhone() {
        val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
        vibrator?.let {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                it.vibrate(VibrationEffect.createOneShot(100, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                @Suppress("DEPRECATION")
                it.vibrate(100)
            }
        }
    }

    fun onRegisterToday() {
        val newSet = studyDates.toMutableSet().apply { add(todayStr) }
        studyDates = newSet
        sharedPrefs.edit().putStringSet("study_dates", newSet).apply()
        vibratePhone()
        currentQuoteIndex = (0..QUOTES.lastIndex).filter { it != currentQuoteIndex }.random()
    }

    Scaffold(
        containerColor = DarkBackground,
        topBar = {
            CenterAlignedTopAppBar(
                colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                    containerColor = DarkBackground
                ),
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Whatshot,
                            contentDescription = null,
                            tint = NeonGreen,
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "RACHA",
                            color = Color.White,
                            fontWeight = FontWeight.Black,
                            letterSpacing = 2.sp,
                            fontSize = 22.sp
                        )
                    }
                }
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = 20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            // 1. CONTADOR GRANDE DE DÍAS CONSECUTIVOS DE ESTUDIO
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 10.dp)
                        .clip(RoundedCornerShape(28.dp))
                        .background(CardBackground)
                        .border(1.dp, NeonGreen.copy(alpha = 0.35f), RoundedCornerShape(28.dp))
                        .padding(vertical = 32.dp, horizontal = 20.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "DÍAS CONSECUTIVOS",
                            color = NeonCyan,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            letterSpacing = 2.sp
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "$currentStreak",
                            color = NeonGreen,
                            fontSize = 84.sp,
                            fontWeight = FontWeight.Black,
                            fontFamily = FontFamily.Monospace,
                            textAlign = TextAlign.Center
                        )
                        Text(
                            text = if (hasStudiedToday) "¡Racha activa hoy! 🔥" else "Pendiente de registrar hoy",
                            color = if (hasStudiedToday) NeonGreen else Color.Gray,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Medium
                        )
                    }
                }
            }

            // 2. BOTÓN «HOY SÍ ESTUDIÉ»
            item {
                Button(
                    onClick = { if (!hasStudiedToday) onRegisterToday() },
                    enabled = !hasStudiedToday,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = NeonGreen,
                        disabledContainerColor = CardBackground
                    ),
                    shape = RoundedCornerShape(20.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(64.dp)
                        .border(
                            width = if (hasStudiedToday) 1.dp else 0.dp,
                            color = if (hasStudiedToday) NeonGreen.copy(alpha = 0.5f) else Color.Transparent,
                            shape = RoundedCornerShape(20.dp)
                        )
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        if (hasStudiedToday) {
                            Icon(
                                imageVector = Icons.Default.Check,
                                contentDescription = null,
                                tint = NeonGreen,
                                modifier = Modifier.size(26.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "¡HOY SÍ ESTUDIÉ! ✓",
                                color = NeonGreen,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.Bold
                            )
                        } else {
                            Text(
                                text = "«HOY SÍ ESTUDIÉ»",
                                color = Color.Black,
                                fontSize = 19.sp,
                                fontWeight = FontWeight.ExtraBold,
                                letterSpacing = 1.sp
                            )
                        }
                    }
                }
            }

            // 3. MENSAJE MOTIVADOR DISTINTO CADA VEZ
            item {
                val (quote, author) = QUOTES[currentQuoteIndex]
                Card(
                    colors = CardDefaults.cardColors(containerColor = CardBackground),
                    shape = RoundedCornerShape(20.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.dp, Color(0xFF22283A), RoundedCornerShape(20.dp))
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "MENSAJE MOTIVADOR",
                                color = NeonCyan,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                letterSpacing = 1.5.sp
                            )
                            IconButton(
                                onClick = {
                                    currentQuoteIndex = (0..QUOTES.lastIndex)
                                        .filter { it != currentQuoteIndex }
                                        .random()
                                },
                                modifier = Modifier.size(28.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.Refresh,
                                    contentDescription = "Cambiar frase",
                                    tint = Color.LightGray,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "“$quote”",
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Medium,
                            lineHeight = 22.sp
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "— $author",
                            color = NeonGreen.copy(alpha = 0.85f),
                            fontSize = 13.sp,
                            fontWeight = FontWeight.SemiBold,
                            textAlign = TextAlign.End,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            }

            // 4. LISTA DE LOS ÚLTIMOS SIETE DÍAS
            item {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 4.dp, bottom = 24.dp)
                ) {
                    Text(
                        text = "ÚLTIMOS 7 DÍAS",
                        color = Color.LightGray,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 1.5.sp,
                        modifier = Modifier.padding(bottom = 12.dp, start = 4.dp)
                    )

                    val last7Days = remember(studyDates) {
                        (6 downTo 0).map { offset ->
                            LocalDate.now().minusDays(offset.toLong())
                        }
                    }

                    Column(
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        last7Days.forEach { date ->
                            val dateIso = date.format(DateTimeFormatter.ISO_LOCAL_DATE)
                            val isCompleted = studyDates.contains(dateIso)
                            val isToday = dateIso == todayStr
                            val dayName = date.dayOfWeek.getDisplayName(TextStyle.SHORT, Locale("es", "ES")).uppercase()
                            val formattedDate = date.format(DateTimeFormatter.ofPattern("d 'de' MMMM", Locale("es", "ES")))

                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(14.dp))
                                    .background(CardBackground)
                                    .border(
                                        width = 1.dp,
                                        color = if (isToday) NeonGreen.copy(alpha = 0.4f) else Color(0xFF1E2333),
                                        shape = RoundedCornerShape(14.dp)
                                    )
                                    .padding(horizontal = 16.dp, vertical = 14.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(CircleShape)
                                            .background(
                                                if (isCompleted) NeonGreen.copy(alpha = 0.15f)
                                                else Color(0xFF181C26)
                                            )
                                            .border(
                                                1.dp,
                                                if (isCompleted) NeonGreen else Color(0xFF2C3246),
                                                CircleShape
                                            ),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = dayName.take(3),
                                            color = if (isCompleted) NeonGreen else Color.Gray,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 11.sp
                                        )
                                    }

                                    Spacer(modifier = Modifier.width(14.dp))

                                    Column {
                                        Text(
                                            text = if (isToday) "Hoy, $formattedDate" else formattedDate,
                                            color = Color.White,
                                            fontSize = 14.sp,
                                            fontWeight = if (isToday) FontWeight.Bold else FontWeight.Medium
                                        )
                                        Text(
                                            text = if (isCompleted) "Sesión completada" else if (isToday) "Pendiente hoy" else "Sin estudio",
                                            color = if (isCompleted) NeonGreen else Color.Gray,
                                            fontSize = 12.sp
                                        )
                                    }
                                }

                                if (isCompleted) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = "Completado",
                                        tint = NeonGreen,
                                        modifier = Modifier.size(20.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

fun calculateCurrentStreak(dates: Set<String>): Int {
    val now = LocalDate.now()
    val todayStr = now.format(DateTimeFormatter.ISO_LOCAL_DATE)
    val yesterdayStr = now.minusDays(1).format(DateTimeFormatter.ISO_LOCAL_DATE)

    if (dates.contains(todayStr)) {
        var streak = 1
        var check = now.minusDays(1)
        while (dates.contains(check.format(DateTimeFormatter.ISO_LOCAL_DATE))) {
            streak++
            check = check.minusDays(1)
        }
        return streak
    } else if (dates.contains(yesterdayStr)) {
        var streak = 1
        var check = now.minusDays(2)
        while (dates.contains(check.format(DateTimeFormatter.ISO_LOCAL_DATE))) {
            streak++
            check = check.minusDays(1)
        }
        return streak
    }
    return 0
}
`,

  theme: `package com.racha.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val DarkBackground = Color(0xFF08090C)
val CardBackground = Color(0xFF10141E)
val NeonGreen = Color(0xFF00FF88)
val NeonCyan = Color(0xFF00F0FF)
val NeonAmber = Color(0xFFFFB800)

private val DarkColorScheme = darkColorScheme(
    primary = NeonGreen,
    secondary = NeonCyan,
    background = DarkBackground,
    surface = CardBackground,
    onPrimary = Color.Black,
    onSecondary = Color.Black,
    onBackground = Color.White,
    onSurface = Color.White
)

@Composable
fun RachaTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
`,

  buildGradle: `// build.gradle.kts (Module :app)
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "com.racha.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.racha.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.10.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
}
`
};
