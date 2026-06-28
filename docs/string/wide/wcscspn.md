# std::wcscspn

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t wcscspn( const wchar_t* dest, const wchar_t* src );
```

Retorna o comprimento do segmento inicial máximo da wide string apontada por dest, que consiste apenas nos caracteres _não_ encontrados na wide string apontada por src.

### Parâmetros

- **dest** — ponteiro para a wide string terminada em nulo a ser analisada
- **src** — ponteiro para a wide string terminada em nulo que contém os caracteres a serem procurados

### Valor de retorno

O comprimento do segmento inicial máximo que contém apenas caracteres não encontrados na string de caracteres apontada por src.

### Exemplo

A saída abaixo foi obtida usando clang (libc++).

Execute este código
```cpp
    #include <cwchar>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        wchar_t dest[] = L"白猫 黑狗 甲虫";
        //                      └───┐
        const wchar_t* src = L"甲虫,黑狗";
     
        const std::size_t len = std::wcscspn(dest, src);
        dest[len] = L'\0'; // terminates the segment to print it out
     
        std::wcout.imbue(std::locale("en_US.utf8"));
        std::wcout << L"The length of maximum initial segment is " << len << L".\n";
        std::wcout << L"The segment is \"" << dest << L"\".\n";
    }
```

Saída possível:
```
    The length of maximum initial segment is 3.
    The segment is "白猫 ".
```

### Veja também

[ wcsspn](<#/doc/string/wide/wcsspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres largos encontrados em outra wide string
(função)
[ wcspbrk](<#/doc/string/wide/wcspbrk>) | encontra a primeira ocorrência de qualquer caractere largo em uma wide string, em outra wide string
(função)
[Documentação C](<#/>) para wcscspn