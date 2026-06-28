# std::hash (std::experimental::string_view, std::experimental::wstring_view, std::experimental::u16string_view, std::experimental::u32string_view)

Definido no cabeçalho `[<experimental/string_view>](<#/doc/header/experimental/string_view>)`

```c
template<> struct hash<std::experimental::string_view>;
template<> struct hash<std::experimental::wstring_view>;
template<> struct hash<std::experimental::u16string_view>;
template<> struct hash<std::experimental::u32string_view>;
```

Especializações de template de [std::hash](<#/doc/utility/hash>) para as várias classes view para hashing de views.

### Veja também

[ hash](<#/doc/utility/hash>)(desde C++11) | objeto de função hash
(modelo de classe)