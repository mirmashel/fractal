package io

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ConnectionHandler

fun main(args: Array<String>) {
    runApplication<ConnectionHandler>(*args)
}