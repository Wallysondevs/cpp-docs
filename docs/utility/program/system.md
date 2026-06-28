# std::system

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int system( const char* command );
```

Chama o processador de comandos do ambiente hospedeiro (por exemplo, `/bin/sh`, `cmd.exe`) com o parâmetro `command`. Retorna um valor definido pela implementação (geralmente o valor que o programa invocado retorna).

Se `command` for um ponteiro nulo, verifica se o ambiente hospedeiro possui um processador de comandos e retorna um valor diferente de zero se e somente se o processador de comandos existir.

### Parâmetros

- **command** — string de caracteres que identifica o comando a ser executado no processador de comandos. Se um ponteiro nulo for fornecido, a existência do processador de comandos é verificada.

### Valor de retorno

Valor definido pela implementação. Se `command` for um ponteiro nulo, retorna um valor diferente de zero se e somente se o processador de comandos existir.

### Observações

Em sistemas POSIX, o valor de retorno pode ser decomposto usando [`WEXITSTATUS` e `WSTOPSIG`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/wait.html>).

A função POSIX relacionada [`popen`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/popen.html>) torna a saída gerada por `command` disponível para o chamador.

Um flush explícito de [`std::cout`](<#/doc/io/cout>) também é necessário antes de uma chamada para **std::system**, se o processo gerado realizar qualquer E/S de tela.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        std::system("ls -l >test.txt"); // executa o comando UNIX "ls -l >test.txt"
        std::cout << std::ifstream("test.txt").rdbuf();
    }
```

Saída possível:
```
    total 16
    -rwxr-xr-x 1 2001 2000 8859 Sep 30 20:52 a.out
    -rw-rw-rw- 1 2001 2000  161 Sep 30 20:52 main.cpp
    -rw-r--r-- 1 2001 2000    0 Sep 30 20:52 test.txt
```

### Veja também

[`Documentação C`](<#/>) para system
---