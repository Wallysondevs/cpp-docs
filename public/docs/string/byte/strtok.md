# std::strtok

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
char* strtok( char* str, const char* delim );
```

Encontra o próximo token em uma string de bytes terminada em nulo apontada por str. Os caracteres separadores são identificados pela string de bytes terminada em nulo apontada por delim.

Esta função é projetada para ser chamada múltiplas vezes para obter tokens sucessivos da mesma string.

  * Se str não for um ponteiro nulo, a chamada é tratada como a primeira chamada para `strtok` para esta string em particular. A função procura pelo primeiro caractere que _não_ está contido em delim.

    

  * Se nenhum caractere desse tipo for encontrado, não há tokens em str, e a função retorna um ponteiro nulo.
  * Se tal caractere for encontrado, ele é o _início do token_. A função então procura a partir desse ponto pelo primeiro caractere que _está_ contido em delim.

    

  * Se nenhum caractere desse tipo for encontrado, str tem apenas um token, e as chamadas futuras para `strtok` retornarão um ponteiro nulo.
  * Se tal caractere for encontrado, ele é _substituído_ pelo caractere nulo '\0' e o ponteiro para o caractere seguinte é armazenado em um local estático para invocações subsequentes.

  * A função então retorna o ponteiro para o início do token.

  * Se str for um ponteiro nulo, a chamada é tratada como uma chamada subsequente para `strtok`: a função continua de onde parou na invocação anterior. O comportamento é o mesmo como se o ponteiro previamente armazenado fosse passado como str.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser tokenizada
- **delim** — ponteiro para a string de bytes terminada em nulo que identifica os delimitadores

### Valor de retorno

Ponteiro para o início do próximo token ou um nullptr se não houver mais tokens.

### Notas

Esta função é destrutiva: ela escreve os caracteres '\0' nos elementos da string str. Em particular, um [literal de string](<#/doc/language/string_literal>) não pode ser usado como o primeiro argumento de `std::strtok`.

Cada chamada a esta função modifica uma variável estática: não é thread-safe.

Ao contrário da maioria dos outros tokenizadores, os delimitadores em `std::strtok` podem ser diferentes para cada token subsequente, e podem até depender do conteúdo dos tokens anteriores.

### Implementação possível
```cpp
    char* strtok(char* str, const char* delim)
    {
        static char* buffer;
    
        if (str != nullptr)
            buffer = str;
    
        buffer += std::strspn(buffer, delim);
    
        if (*buffer == '\0')
            return nullptr;
    
        char* const tokenBegin = buffer;
    
        buffer += std::strcspn(buffer, delim);
    
        if (*buffer != '\0')
            *buffer++ = '\0';
    
        return tokenBegin;
    }
```

---

Implementações reais da biblioteca C++ desta função delegam à biblioteca C, onde ela pode ser implementada diretamente (como em [MUSL libc](<https://github.com/bminor/musl/blob/master/src/string/strtok.c>)), ou em termos de sua versão reentrante (como em [GNU libc](<https://github.com/bminor/glibc/blob/master/string/strtok.c>)).

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iomanip>
    #include <iostream>
    
    int main() 
    {
        char input[] = "one + two * (three - four)!";
        const char* delimiters = "! +- (*)";
        char* token = std::strtok(input, delimiters);
        while (token)
        {
            std::cout << std::quoted(token) << ' ';
            token = std::strtok(nullptr, delimiters);
        }
    
        std::cout << "\nContents of the input string now:\n\"";
        for (std::size_t n = 0; n < sizeof input; ++n)
        {
            if (const char c = input[n]; c != '\0')
                std::cout << c;
            else
                std::cout << "\\0";
        }
        std::cout << "\"\n";
    }
```

Saída:
```
    "one" "two" "three" "four" 
    Contents of the input string now:
    "one\0+ two\0* (three\0- four\0!\0"
```

### Veja também

[ strpbrk](<#/doc/string/byte/strpbrk>) | encontra a primeira ocorrência de qualquer caractere de um conjunto de separadores
(função)
[ strcspn](<#/doc/string/byte/strcspn>) | retorna o comprimento do segmento inicial máximo que consiste apenas nos caracteres não encontrados em outra string de bytes
(função)
[ strspn](<#/doc/string/byte/strspn>) | retorna o comprimento do segmento inicial máximo que consiste apenas nos caracteres encontrados em outra string de bytes
(função)
[ ranges::split_viewviews::split](<#/doc/ranges/split_view>)(C++20) | uma [`view`](<#/doc/ranges/view>) sobre os sub-ranges obtidos ao dividir outra [`view`](<#/doc/ranges/view>) usando um delimitador
(modelo de classe) (objeto adaptador de range)
[documentação C](<#/>) para strtok