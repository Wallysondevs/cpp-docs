# std::wcstok

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wcstok( wchar_t* str, const wchar_t* delim, wchar_t ** ptr);
```

Encontra o próximo token em uma wide string terminada em nulo apontada por str. Os caracteres separadores são identificados pela wide string terminada em nulo apontada por delim.

Esta função é projetada para ser chamada múltiplas vezes para obter tokens sucessivos da mesma string.

*   Se str != nullptr, a chamada é tratada como a primeira chamada para `std::wcstok` para esta wide string em particular. A função procura pelo primeiro wide character que _não_ está contido em delim.

*   Se nenhum wide character desse tipo for encontrado, não há tokens em str, e a função retorna um ponteiro nulo.
*   Se tal wide character for encontrado, ele é o _início do token_. A função então procura a partir desse ponto pelo primeiro wide character que _está_ contido em delim.

*   Se nenhum wide character desse tipo for encontrado, str tem apenas um token, e chamadas futuras para `std::wcstok` retornarão um ponteiro nulo.
*   Se tal wide character for encontrado, ele é _substituído_ pelo wide character nulo L'\0' e o estado do parser (tipicamente um ponteiro para o wide character seguinte) é armazenado no local fornecido pelo usuário *ptr.

*   A função então retorna o ponteiro para o início do token.

*   Se str == nullptr, a chamada é tratada como chamadas subsequentes para `std::wcstok`: a função continua de onde parou na invocação anterior com o mesmo *ptr. O comportamento é o mesmo como se o ponteiro para o wide character que segue o último token detectado fosse passado como str.

### Parâmetros

- **str** — ponteiro para a wide string terminada em nulo a ser tokenizada
- **delim** — ponteiro para a wide string terminada em nulo que identifica os delimitadores
- **ptr** — ponteiro para um objeto do tipo wchar_t*, que é usado por wcstok para armazenar seu estado interno

### Valor de retorno

Ponteiro para o início do próximo token ou ponteiro nulo se não houver mais tokens.

### Nota

Esta função é destrutiva: ela escreve os caracteres L'\0' nos elementos da string str. Em particular, um literal de wide string não pode ser usado como o primeiro argumento de `std::wcstok`.

Ao contrário de [std::strtok](<#/doc/string/byte/strtok>), esta função não atualiza o armazenamento estático: ela armazena o estado do parser no local fornecido pelo usuário.

Ao contrário da maioria dos outros tokenizadores, os delimitadores em `std::wcstok` podem ser diferentes para cada token subsequente, e podem até depender do conteúdo dos tokens anteriores.

### Exemplo

Execute este código
```cpp
    #include <cwchar>
    #include <iostream>
     
    int main()
    {
        wchar_t input[100] = L"A bird came down the walk";
        wchar_t* buffer;
        wchar_t* token = std::wcstok(input, L" ", &buffer);
        while (token)
        {
            std::wcout << token << '\n';
            token = std::wcstok(nullptr, L" ", &buffer);
        }
    }
```

Saída:
```
    A
    bird
    came
    down
    the
    walk
```

### Veja também

[ strtok](<#/doc/string/byte/strtok>) | encontra o próximo token em uma string de bytes
(função)
[Documentação C](<#/>) para wcstok