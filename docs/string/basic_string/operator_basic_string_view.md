# std::basic_string&lt;CharT,Traits,Allocator&gt;::operator basic_string_view

```cpp
operator std::basic_string_view<CharT, Traits>() const noexcept;  // (desde C++17)
(constexpr desde C++20)
```

Retorna um [std::basic_string_view](<#/doc/string/basic_string_view>), construído(a) como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>(data(), size()).

### Parâmetros

(nenhum)

### Valor de retorno

Um string view representando todo o conteúdo da string.

### Notas

É responsabilidade do programador garantir que o string view resultante não sobreviva à string.
```
    std::string get_string();
    int f(std::string_view sv);
     
    int x = f(get_string()); // OK
    std::string_view sv = get_string(); // Ruim: mantém um ponteiro pendente
```

### Exemplo

Run this code
```
    #include <iostream>
    #include <string>
    #include <string_view>
     
    void show_wstring_size(std::wstring_view wcstr_v)
    {
        std::cout << wcstr_v.size() << " code points\n";
    }
     
    int main()
    {
        std::string cppstr = "ラーメン";   // string estreita
        std::wstring wcstr = L"ラーメン";  // string larga
     
        // Conversão implícita de string para string_view
        // via std::string::operator string_view:
        std::string_view cppstr_v = cppstr;
     
        std::cout << cppstr_v << '\n'
                  << cppstr_v.size() << " code units\n";
     
        // Conversão implícita de wstring para wstring_view
        // via std::wstring::operator wstring_view:
        show_wstring_size(wcstr);
    }
```

Saída:
```
    ラーメン
    12 code units
    4 code points
```

### Ver também

[ (constructor)](<#/doc/string/basic_string_view/basic_string_view>) | constrói um `basic_string_view`
(função membro pública de `std::basic_string_view<CharT,Traits>`)