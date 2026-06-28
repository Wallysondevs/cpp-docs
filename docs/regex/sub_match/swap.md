# std::sub_match&lt;BidirIt&gt;::swap

```cpp
void swap( sub_match& s ) noexcept(/* see below */);  // (desde C++11)
```

  
Troca o conteúdo de dois objetos sub-match. Equivalente a 

this->pair<BidirIt, BidirIt>::swap(s);  
[std::swap](<#/doc/algorithm/swap>)(matched, s.matched);

### Parâmetros

s  |  \-  |  um `sub_match` para trocar com   
Requisitos de tipo   
-`BidirIt` deve satisfazer os requisitos de [LegacySwappable](<https://en.cppreference.com/mwiki/index.php?title=cpp/named_req/LegacySwappable&action=edit&redlink=1> "cpp/named req/LegacySwappable (page does not exist)").   
  
### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;BidirIt&gt;)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <regex>
    
    int main()
    {
        const char* s = "Quick red cat";
        std::sub_match<const char*> x, y;
    
        x.first = &s[0];
        x.second = &s[5];
        x.matched = false;
    
        y.first = &s[012];
        y.second = &s[13];
        y.matched = true;
    
        std::cout << "Before swap:\n";
        std::cout << "x.str() = [" << x.str() << "]\n";
        std::cout << "y.str() = [" << y.str() << "]\n";
        assert(!x.matched and y.matched);
    
        x.swap(y);
    
        std::cout << "After swap:\n";
        std::cout << "x.str() = [" << x.str() << "]\n";
        std::cout << "y.str() = [" << y.str() << "]\n";
        assert(x.matched and !y.matched);
    }
```

Output: 
```
    Before swap:
    x.str() = []
    y.str() = [cat]
    After swap:
    x.str() = [cat]
    y.str() = []
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 3204](<https://cplusplus.github.io/LWG/issue3204>) | C++11  | [std::sub_match](<#/doc/regex/sub_match>) usava o std::pair::swap(pair&) herdado, o que levava a um *slicing*  | std::sub_match::swap(sub_match&) é adicionado 