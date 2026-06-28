# std::fgets

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
char* fgets( char* str, int count, std::FILE* stream );
```

Lê no máximo count - 1 caracteres do stream de arquivo fornecido e os armazena no array de caracteres apontado por str. A análise para se um caractere de nova linha for encontrado, caso em que str conterá esse caractere de nova linha, ou se o fim do arquivo ocorrer. Se bytes forem lidos e nenhum erro ocorrer, escreve um caractere nulo na posição imediatamente após o último caractere escrito em str.

### Parâmetros

- **str** — ponteiro para um elemento de um array de char
- **count** — número máximo de caracteres a serem escritos (tipicamente o comprimento de str)
- **stream** — stream de arquivo para ler os dados

### Valor de retorno

str em caso de sucesso, ponteiro nulo em caso de falha.

Se a condição de fim de arquivo for encontrada, define o indicador _eof_ no stream (veja [std::feof()](<#/doc/io/c/feof>)). Isso é considerado uma falha apenas se não causar a leitura de bytes, caso em que um ponteiro nulo é retornado e o conteúdo do array apontado por str não é alterado (ou seja, o primeiro byte não é sobrescrito com um caractere nulo).

Se a falha foi causada por algum outro erro, define o indicador _error_ no stream (veja [std::ferror()](<#/doc/io/c/ferror>)). O conteúdo do array apontado por str é indeterminado (pode nem mesmo ser terminado em nulo).

### Notas

[POSIX adicionalmente exige](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/fgets.html>) que `fgets` defina [errno](<#/doc/error/errno>) se encontrar uma falha diferente da condição de fim de arquivo.

Embora a especificação padrão seja [pouco clara](<https://stackoverflow.com/questions/23388620>) nos casos em que count <= 1, implementações comuns fazem

*   se count < 1, não faz nada, reporta erro,
*   se count == 1,

    *   algumas implementações não fazem nada, reportam erro,
    *   outras não leem nada, armazenam zero em str[0], reportam sucesso.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstdlib>
    #include <iomanip>
    #include <iostream>
    #include <span>
    
    void dump(std::span<const char> buf, std::size_t offset)
    {
        std::cout << std::dec;
        for (char ch : buf)
            std::cout << (ch >= ' ' ? ch : '.'), offset--;
        std::cout << std::string(offset, ' ') << std::hex
                  << std::setfill('0') << std::uppercase;
        for (unsigned ch : buf)
            std::cout << std::setw(2) << ch << ' ';
        std::cout << std::dec << '\n';
    }
    
    int main()
    {
        std::FILE* tmpf = std::tmpfile();
        std::fputs("Alan Turing\n", tmpf);
        std::fputs("John von Neumann\n", tmpf);
        std::fputs("Alonzo Church\n", tmpf);
    
        std::rewind(tmpf);
        for (char buf[8]; std::fgets(buf, sizeof buf, tmpf) != nullptr;)
            dump(buf, 10);
    }
```

Saída:
```
    Alan Tu.  41 6C 61 6E 20 54 75 00 
    ring..u.  72 69 6E 67 0A 00 75 00 
    John vo.  4A 6F 68 6E 20 76 6F 00 
    n Neuma.  6E 20 4E 65 75 6D 61 00 
    nn..uma.  6E 6E 0A 00 75 6D 61 00 
    Alonzo .  41 6C 6F 6E 7A 6F 20 00 
    Church..  43 68 75 72 63 68 0A 00
```

### Veja também

[ scanffscanfsscanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ gets](<#/doc/io/c/gets>)(obsoleto em C++11)(removido em C++14) | lê uma string de caracteres de [stdin](<#/doc/io/c/std_streams>)
(função)
[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres em um stream de arquivo
(função)
[Documentação C](<#/>) para fgets