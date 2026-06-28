# std::regex_iterator&lt;BidirIt,CharT,Traits&gt;::regex_iterator

```cpp
regex_iterator();  // (1) (desde C++11)
regex_iterator( BidirIt a, BidirIt b,
const regex_type& re,
std::regex_constants::match_flag_type m =
std::regex_constants::match_default );  // (2) (desde C++11)
regex_iterator( const regex_iterator& );  // (3) (desde C++11)
regex_iterator( BidirIt, BidirIt,
const regex_type&&,
std::regex_constants::match_flag_type =
std::regex_constants::match_default ) = delete;  // (4) (desde C++11)
```

  
Constrói um novo `regex_iterator`: 

1) Construtor padrão. Constrói um iterator de fim de sequência.

2) Constrói um `regex_iterator` a partir da sequência de caracteres `[`a`, `b`)`, da expressão regular re, e de uma flag m que governa o comportamento de correspondência. Este construtor realiza uma chamada inicial para [std::regex_search](<#/doc/regex/regex_search>) com esses dados. Se o resultado desta chamada inicial for falso, *this é definido como um iterator de fim de sequência.

3) Copia um `regex_iterator`.

4) A sobrecarga (2) não é permitida ser chamada com uma regex temporária, já que o iterator retornado seria imediatamente invalidado.

### Parâmetros

a  |  \-  |  [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para o início da sequência de caracteres alvo   
---|---|---
b  |  \-  |  [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) para o fim da sequência de caracteres alvo   
re  |  \-  |  expressão regular usada para buscar na sequência de caracteres alvo   
m  |  \-  |  flags que governam o comportamento de re  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view str{R"(
            #ONE: *p = &Mass;
            #Two: MOV %rd, 42
        )"};
        const std::regex re("[a-w]");
    
        // cria regex_iterator, sobrecarga (2)
        auto it = std::regex_iterator<std::string_view::iterator>
        {
            str.cbegin(), str.cend(),
            re // re é lvalue; se uma expressão imediata fosse usada
               // em vez disso, por exemplo, std::regex{"[a-z]"}, isso
               // produziria um erro já que a sobrecarga (4) é deletada
        };
    
        for (decltype(it) last /* sobrecarga (1) */; it != last; ++it)
            std::cout << (*it).str();
        std::cout << '\n';
    }
```

Output: 
```
    password
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 2332](<https://cplusplus.github.io/LWG/issue2332>) | C++11  | um `regex_iterator` construído a partir de um `basic_regex` temporário tornou-se imediatamente inválido  | tal construção é proibida via uma sobrecarga deletada 