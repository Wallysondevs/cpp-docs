# std::basic_string_view&lt;CharT,Traits&gt;::data

```cpp
constexpr const_pointer data() const noexcept;  // (desde C++17)
```

Retorna um ponteiro para o array de caracteres subjacente. O ponteiro é tal que o range `[`data()`, `data() + size()`)` é válido e os valores nele correspondem aos valores da view.

### Parameters

(nenhum)

### Return value

Um ponteiro para o array de caracteres subjacente.

### Complexity

Constante.

### Notes

Ao contrário de [std::basic_string::data()](<#/doc/string/basic_string/data>) e literais de string, `std::basic_string_view::data()` retorna um ponteiro para um buffer que não é necessariamente terminado em nulo, por exemplo, uma substring view (e.g. de [`remove_suffix`](<#/doc/string/basic_string_view/remove_suffix>)). Portanto, é tipicamente um erro passar `data()` para uma rotina que aceita apenas um const CharT* e espera uma string terminada em nulo.

### Example

Execute este código
```cpp
    #include <cstring>
    #include <cwchar>
    #include <iostream>
    #include <string>
    #include <string_view>
    
    int main()
    {
        std::wstring_view wcstr_v = L"xyzzy";
        std::cout << std::wcslen(wcstr_v.data()) << '\n';
        // OK: o array de caracteres subjacente é terminado em nulo
    
        char array[3] = {'B', 'a', 'r'};
        std::string_view array_v(array, sizeof array);
        // std::cout << std::strlen(array_v.data()) << '\n';
        // erro: o array de caracteres subjacente não é terminado em nulo
    
        std::string str(array_v.data(), array_v.size()); // OK
        std::cout << std::strlen(str.data()) << '\n';
        // OK: o array de caracteres subjacente de uma std::string é sempre terminado em nulo
    }
```

Saída:
```
    5
    3
```

### See also

[ front](<#/doc/string/basic_string_view/front>) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/string/basic_string_view/back>) | acessa o último caractere
(função membro pública)
[ data](<#/doc/string/basic_string/data>) | retorna um ponteiro para o primeiro caractere de uma string
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)