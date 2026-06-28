# std::fopen

Definido no cabeçalho `<cstdio>`

```c
`std::FILE* fopen( const char* filename, const char* mode );`
```

Abre um arquivo indicado por filename e retorna um stream de arquivo associado a esse arquivo. mode é usado para determinar o modo de acesso ao arquivo.

### Parâmetros

- **filename** — nome do arquivo para associar ao stream de arquivo
- **mode** — string de caracteres terminada em nulo que determina o [modo de acesso ao arquivo](<#/doc/io/c/fopen>)

### Flags de acesso ao arquivo

String do modo de acesso ao arquivo | Significado | Explicação | Ação se o arquivo já existe | Ação se o arquivo não existe
---|---|---|---|---
`"r"` | leitura | Abre um arquivo para leitura | lê do início | retorna [NULL](<#/doc/types/NULL>) e define erro
`"w"` | escrita | Cria um arquivo para escrita | destrói o conteúdo | cria novo
`"a"` | anexar | Anexa a um arquivo | escreve no final | cria novo
`"r+"` | leitura estendida | Abre um arquivo para leitura/escrita | lê do início | retorna [NULL](<#/doc/types/NULL>) e define erro
`"w+"` | escrita estendida | Cria um arquivo para leitura/escrita | destrói o conteúdo | cria novo
`"a+"` | anexar estendido | Abre um arquivo para leitura/escrita | escreve no final | cria novo
A flag de modo de acesso ao arquivo `"b"` pode ser opcionalmente especificada para abrir um arquivo [em modo binário](<#/doc/io/c/FILE>). Esta flag não tem efeito em sistemas POSIX, mas no Windows, por exemplo, ela desabilita o tratamento especial de `'\n'` e `'\x1A'`.
Nos modos de acesso ao arquivo de anexação, os dados são escritos no final do arquivo independentemente da posição atual do indicador de posição do arquivo.
A flag de modo de acesso ao arquivo `"x"` pode ser opcionalmente anexada aos especificadores `"w"` ou `"w+"`. Esta flag força a função a falhar se o arquivo existir, em vez de sobrescrevê-lo. (C++17)
O comportamento é indefinido se o modo não for uma das strings listadas acima. Algumas implementações definem modos adicionais suportados (por exemplo, [Windows](<https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/fopen-wfopen>)).

### Valor de retorno

Se bem-sucedido, retorna um ponteiro para o objeto que controla o stream de arquivo aberto, com os bits `eof` e `error` limpos. O stream é totalmente armazenado em buffer, a menos que `filename` se refira a um dispositivo interativo.

Em caso de erro, retorna um ponteiro nulo. [POSIX exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fopen.html>) que [errno](<#/doc/error/errno>) seja definido neste caso.

### Observações

O formato de `filename` é definido pela implementação e não se refere necessariamente a um arquivo (por exemplo, pode ser o console ou outro dispositivo acessível através da API do sistema de arquivos). Em plataformas que os suportam, `filename` pode incluir um caminho absoluto ou relativo do sistema de arquivos.

Para nomeação portátil de diretórios e arquivos, consulte a [biblioteca de sistema de arquivos C++](<#/doc/filesystem>) ou [boost.filesystem](<https://www.boost.org/doc/libs/release/libs/filesystem/doc/index.htm>).

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    
    int main()
    {
        int is_ok = EXIT_FAILURE;
        FILE* fp = std::fopen("/tmp/test.txt", "w+");
        if (!fp)
        {
            std::perror("File opening failed");
            return is_ok;
        }
    
        int c; // Note: int, not char, required to handle EOF
        while ((c = std::fgetc(fp)) != EOF) // Standard C I/O file reading loop
            std::putchar(c);
    
        if (std::ferror(fp))
            std::puts("I/O error when reading");
        else if (std::feof(fp))
        {
            std::puts("End of file reached successfully");
            is_ok = EXIT_SUCCESS;
        }
    
        std::fclose(fp);
        return is_ok;
    }
```

Saída:
```
    End of file reached successfully
```

### Veja também

[ fclose](<#/doc/io/c/fclose>) | fecha um arquivo
(função)
[ fflush](<#/doc/io/c/fflush>) | sincroniza um stream de saída com o arquivo real
(função)
[ freopen](<#/doc/io/c/freopen>) | abre um stream existente com um nome diferente
(função)
[Documentação C](<#/>) para fopen