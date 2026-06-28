# Palavra-chave C++: asm

### Uso

  * [Declaração de um bloco de assembly inline](<#/doc/language/asm>)

### Exemplo

Note que, embora este exemplo funcione bem com GCC/Clang na plataforma x86_64 sob Linux, não é garantido em outros lugares, pois a declaração `asm` é condicionalmente suportada e (desde C++11) [definida pela implementação](<#/doc/language/asm>).

Execute este código
```cpp
    #include <cstring>
     
    int main() noexcept
    {
        const char* const c_string = "Hello, world!\n";
        asm
        (R"(
            movq $1, %%rax                 # número da syscall para sys_write
            movq $1, %%rdi                 # descritor de arquivo 1 (stdout)
            movq %0, %%rsi                 # ponteiro para a c-string
            movq %1, %%rdx                 # comprimento da c-string
            syscall                        # invoca um manipulador de chamada de sistema do SO
        )"
        :                                  // sem operandos de saída
        :   "r"(c_string),                 // entrada: ponteiro para a c-string
            "r"(std::strlen(c_string))     // entrada: tamanho da c-string
        :   "%rax", "%rdi", "%rsi", "%rdx" // registradores sobrescritos
        );
    }
```

Saída:
```
    Hello, world!
```