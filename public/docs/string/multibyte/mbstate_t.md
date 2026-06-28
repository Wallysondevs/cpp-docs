# std::mbstate_t

Definido no header `[<cuchar>](<#/doc/header/cuchar>)` | | (desde C++17)

```cpp
Definido no header `<cwchar>`
struct mbstate_t;
```

O tipo mbstate_t é um tipo trivial não-array que pode representar qualquer um dos estados de conversão que podem ocorrer em um conjunto de regras de codificação de caracteres multibyte suportadas e definidas pela implementação. Um valor de `mbstate_t` inicializado com zero representa o estado de conversão inicial, embora outros valores de `mbstate_t` possam existir que também representem o estado de conversão inicial.

Uma possível implementação de `mbstate_t` é um tipo struct contendo um array que representa o caractere multibyte incompleto, um contador inteiro indicando o número de bytes no array que foram processados, e uma representação do estado de shift atual.

As seguintes funções não devem ser chamadas de múltiplas threads sem sincronização com o argumento `std::mbstate_t*` de um ponteiro nulo devido a possíveis data races: [std::mbrlen](<#/doc/string/multibyte/mbrlen>), [std::mbrtowc](<#/doc/string/multibyte/mbrtowc>), [std::mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>), [std::mbtowc](<#/doc/string/multibyte/mbtowc>), [std::wcrtomb](<#/doc/string/multibyte/wcrtomb>), [std::wcsrtombs](<#/doc/string/multibyte/wcsrtombs>), [std::wctomb](<#/doc/string/multibyte/wctomb>).

### Veja também

[ mbsinit](<#/doc/string/multibyte/mbsinit>) | verifica se o objeto **std::mbstate_t** representa o estado de shift inicial
(função)
[Documentação C](<#/>) para mbstate_t