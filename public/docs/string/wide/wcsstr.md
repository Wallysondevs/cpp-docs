# std::wcsstr

Definido no header `[<cwchar>](<#/doc/header/cwchar>)`

```cpp
const wchar_t* wcsstr( const wchar_t* dest, const wchar_t* src );
wchar_t* wcsstr( wchar_t* dest, const wchar_t* src );
```

Encontra a primeira ocorrência da wide string src na wide string apontada por dest. Os caracteres nulos terminadores não são comparados.

### Parâmetros

- **dest** — ponteiro para a wide string terminada em nulo a ser examinada
- **src** — ponteiro para a wide string terminada em nulo a ser procurada

### Valor de retorno

Ponteiro para o primeiro caractere da substring encontrada em dest, ou um ponteiro nulo se nenhuma substring for encontrada. Se src apontar para uma string vazia, dest é retornado.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    
    int main()
    {
        wchar_t const* origin = L"アルファ, ベータ, ガンマ, アルファ, ベータ, ガンマ.";
        wchar_t const* target = L"ベータ";
        wchar_t const* result = origin;
    
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout << L"Substring to find: \"" << target << L"\"\n"
                   << L"String to search: \"" << origin << L"\"\n\n";
    
        for (; (result = std::wcsstr(result, target)) != nullptr; ++result)
            std::wcout << L"Found: \"" << result << L"\"\n";
    }
```

Saída possível:
```
    Substring to find: "ベータ"
    String to search: "アルファ, ベータ, ガンマ, アルファ, ベータ, ガンマ."
    
    Found: "ベータ, ガンマ, アルファ, ベータ, ガンマ."
    Found: "ベータ, ガンマ."
```

### Veja também

[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ strstr](<#/doc/string/byte/strstr>) | encontra a primeira ocorrência de uma substring de caracteres
(função)
[ wcschr](<#/doc/string/wide/wcschr>) | encontra a primeira ocorrência de um wide character em uma wide string
(função)
[ wcsrchr](<#/doc/string/wide/wcsrchr>) | encontra a última ocorrência de um wide character em uma wide string
(função)
[Documentação C](<#/>) para wcsstr