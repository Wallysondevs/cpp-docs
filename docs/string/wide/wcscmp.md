# std::wcscmp

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
int wcscmp( const wchar_t* lhs, const wchar_t* rhs );
```

  
Compara duas wide strings terminadas em nulo lexicograficamente.

O sinal do resultado é o sinal da diferença entre os valores do primeiro par de wide characters que diferem nas strings sendo comparadas.

O comportamento é indefinido se lhs ou rhs não forem ponteiros para wide strings terminadas em nulo.

### Parâmetros

- **lhs, rhs** — ponteiros para as wide strings terminadas em nulo a serem comparadas
  
### Valor de retorno

Valor negativo se lhs aparecer antes de rhs na ordem lexicográfica.

Zero se lhs e rhs forem iguais na comparação.

Valor positivo se lhs aparecer depois de rhs na ordem lexicográfica.

### Notas

Esta função não é sensível ao locale, ao contrário de [std::wcscoll](<#/doc/string/wide/wcscoll>), e a ordem pode não ser significativa quando caracteres de diferentes blocos Unicode são usados juntos ou quando a ordem das unidades de código não corresponde à ordem de agrupamento (collation order).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cwchar>
    #include <iostream>
    #include <locale>
    #include <vector>
    
    int main()
    {
        std::vector<const wchar_t*> leaders
        {
            L"Ленин", L"Сталин", L"Маленков", L"Хрущёв",
            L"Брежнев", L"Андропов", L"Черненко", L"Горбачёв"
        };
    
        std::ranges::sort(leaders, 
        {
            return std::wcscmp(leaderLHS, leaderRHS) < 0;
        });
    
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        for (auto leader : leaders)
            std::wcout << leader[0] << ' ';
        std::wcout << '\n';
    }
```

Saída:
```
    А Б Г Л М С Х Ч
```

### Veja também

[ wcsncmp](<#/doc/string/wide/wcsncmp>) | compara uma certa quantidade de caracteres de duas wide strings
(função)
[ wmemcmp](<#/doc/string/wide/wmemcmp>) | compara uma certa quantidade de wide characters de dois arrays
(função)
[ strcmp](<#/doc/string/byte/strcmp>) | compara duas strings
(função)
[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas wide strings de acordo com o locale atual
(função)
[Documentação C](<#/>) para wcscmp