# std::wcsspn

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
size_t wcsspn( const wchar_t* dest, const wchar_t* src );
```

Retorna o comprimento do segmento inicial máximo da wide string apontada por dest, que consiste apenas nos caracteres encontrados na wide string apontada por src.

### Parâmetros

- **dest** — ponteiro para a wide string terminada em nulo a ser analisada
- **src** — ponteiro para a wide string terminada em nulo que contém os caracteres a serem procurados

### Valor de retorno

O comprimento do segmento inicial máximo que contém apenas caracteres da wide string apontada por src.

### Exemplo

Execute este código
```cpp
    #include <cwchar>
    #include <iostream>
    #include <locale>
    
    int main()
    {
        wchar_t dest[] = L"白猫 黑狗 甲虫";
        const wchar_t src[] = L" 狗猫 白黑 ";
        const std::size_t len = std::wcsspn(dest, src);
        dest[len] = L'\0'; // terminates the segment to print it out
    
        std::wcout.imbue(std::locale("en_US.utf8"));
        std::wcout << L"The length of maximum initial segment is " << len << L".\n";
        std::wcout << L"The segment is \"" << dest << L"\".\n";
    }
```

Saída possível:
```
    The length of maximum initial segment is 6.
    The segment is "白猫 黑狗 ".
```

### Veja também

[ wcscspn](<#/doc/string/wide/wcscspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres wide _não_ encontrados em outra wide string
(função)
[ wcspbrk](<#/doc/string/wide/wcspbrk>) | encontra a primeira ocorrência de qualquer caractere wide de uma wide string, em outra wide string
(função)
[Documentação C](<#/>) para wcsspn