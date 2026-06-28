# std::sub_match&lt;BidirIt&gt;::sub_match

```cpp
constexpr sub_match();  // (desde C++11)
```

  
Constrói por padrão um [std::sub_match](<#/doc/regex/sub_match>). O membro [`matched`](<#/doc/regex/sub_match>) é definido como `false` e os membros herdados [`first`](<#/doc/regex/sub_match>) e [`second`](<#/doc/regex/sub_match>) são inicializados por valor. 

Este é o único construtor publicamente acessível e definido. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <regex>
     
    int main()
    {
        std::sub_match<const char*> s;
        assert(!s.matched);
    }
```