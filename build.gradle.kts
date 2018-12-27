import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    val ktVersion = "1.3.0"
    kotlin("jvm") version ktVersion

    // spring-related
    id("org.jetbrains.kotlin.plugin.spring") version ktVersion
    id("org.springframework.boot") version "2.0.5.RELEASE"
    id("io.spring.dependency-management") version "1.0.5.RELEASE"
}

group = "pingpong"
version = "1.0-SNAPSHOT"

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    compile(kotlin("stdlib-jdk8"))
    compile(kotlin("reflect"))
    compile("io.github.rybalkinsd", "kohttp", "0.4.0")
    compile("org.slf4j", "slf4j-api", "1.7.25")

    compile(spring("web"))
    compile(spring("actuator"))
    compile(spring("websocket"))

    testCompile("junit", "junit", "4.12")
    testCompile(spring("test"))
}

val fatJar = task("fatJar", type = Jar::class) {
    baseName = "${project.name}-fat"
    manifest {
        attributes["Main-Class"] = "io.MainKt"
    }
    from(configurations.runtime.map({ if (it.isDirectory) it else zipTree(it) }))
    with(tasks["jar"] as CopySpec)
}

tasks {
    "build" {
        dependsOn(fatJar)
    }
}

fun DependencyHandler.spring(module: String, version: String? = null) =
    "org.springframework.boot:spring-boot-starter-$module${version?.let { ":$version" } ?: ""}"


tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}