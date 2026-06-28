# std::hash&lt;std::string_view&gt;, std::hash&lt;std::wstring_view&gt;, std::hash&lt;std::u8string_view&gt;, std::hash&lt;std::u16string_view&gt;, std::hash&lt;std::u32string_view&gt;

Definido no cabeçalho `[<string_view>](<#/doc/header/string_view>)`

```c
template<> struct hash<std::string_view>;
template<> struct hash<std::wstring_view>;
template<> struct hash<std::u8string_view>;
template<> struct hash<std::u16string_view>;
template<> struct hash<std::u32string_view>;
```

Especializações de template de [std::hash](<#/doc/utility/hash>) para as várias classes view para fazer hashing de views.

Esses hashes são iguais aos hashes das classes [std::basic_string](<#/doc/string/basic_string>) correspondentes: Se S é um dos tipos basic_string padrão, SV é o tipo string view correspondente, e s é um objeto do tipo S, então [std::hash](<#/doc/utility/hash>)&lt;S&gt;()(s) == [std::hash](<#/doc/utility/hash>)&lt;SV&gt;()(SV(s)).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
    #include <unordered_set>
    using namespace std::literals;
    
    int main()
    {
        std::cout << "\"A\"   #: " << std::hash<std::string_view>{}("A"sv) << '\n';
        std::cout << "L\"B\"  #: " << std::hash<std::wstring_view>{}(L"B"sv) << '\n';
        std::cout << "u8\"C\" #: " << std::hash<std::u8string_view>{}(u8"C"sv) << '\n';
        std::cout << "u\"D\"  #: " << std::hash<std::u16string_view>{}(u"D"sv) << '\n';
        std::cout << "U\"E\"  #: " << std::hash<std::u32string_view>{}(U"E"sv) << '\n';
    
        // std::hash para a família string_view torna possível manter esses tipos view
        // em containers associativos unordered_*, como unordered_set. Mas garanta
        // que o tempo de vida das strings referenciadas não seja menor que o tempo de vida do container,
        // ou seja, que não ocorram referências pendentes (dangling references).
    
        std::unordered_set stars{"Rigel"sv, "Capella"sv, "Vega"sv, "Arcturus"sv};
    
        for (std::string_view const& s : stars)
            std::cout << s << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    "A"   #: 6919333181322027406
    L"B"  #: 11959850520494268278
    u8"C" #: 12432341034569643010
    u"D"  #: 312659256970442235
    U"E"  #: 18073225910249204957
    Arcturus Vega Capella Rigel
```

### Veja também

[ hash](<#/doc/utility/hash>)(desde C++11) | objeto de função hash
(template de classe)
[ std::hash<std::basic_string>](<#/doc/string/basic_string/hash>)(desde C++11) | suporte a hash para strings
(especialização de template de classe)