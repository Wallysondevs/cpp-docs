# std::wcslen

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t wcslen( const wchar_t* str );
```

Retorna o comprimento de uma wide string, ou seja, o número de caracteres wide não nulos que precedem o caractere wide nulo terminador.

O comportamento é indefinido se não houver um caractere nulo no array de caracteres wide apontado por str.

### Parâmetros

- **str** — ponteiro para a wide string terminada em nulo a ser examinada

### Valor de retorno

O comprimento da wide string str terminada em nulo.

### Possível implementação
```cpp
    std::size_t wcslen(const wchar_t* start)
    {
        // NB: start não é verificado para nullptr!
        const wchar_t* end = start;
        while (*end != L'\0')
            ++end;
        return end - start;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <cwchar>
    int main()
    {
        const wchar_t* str = L"Hello, world!";
        std::wcout << "The length of L\"" << str << "\" is " << std::wcslen(str) << '\n';
    }
```

Saída:
```
    The length of L"Hello, world!" is 13
```

### Veja também

[ strlen](<#/doc/string/byte/strlen>) | retorna o comprimento de uma dada string
(função)
[ mblen](<#/doc/string/multibyte/mblen>) | retorna o número de bytes no próximo caractere multibyte
(função)
[Documentação C](<#/>) para wcslen