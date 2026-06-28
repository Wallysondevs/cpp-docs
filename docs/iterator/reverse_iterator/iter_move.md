# std::iter_move(std::reverse_iterator)

```cpp
friend constexpr std::iter_rvalue_reference_t<Iter>
iter_move( const std::reverse_iterator& i ) noexcept(/* see below */);  // (desde C++20)
```

  
Converte o resultado da desreferenciação do iterator subjacente ajustado para o seu tipo de referência rvalue associado.

Equivalente a auto tmp = i.base();  
return std::[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(\--tmp);. 

Este function template não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos. 

### Parâmetros

i  |  \-  |  um reverse iterator de origem   
  
### Valor de retorno

Uma referência rvalue ou um prvalue temporário. 

### Complexidade

Constante. 

### Exceções

Especificação `noexcept`: 

noexcept(  

[std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;Iter&gt; &&  
noexcept(std::[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(\--[std::declval](<#/doc/utility/declval>)<Iter&>()))  

)

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
     
    void print(const auto& rem, const auto& v)
    {
        std::cout << rem << '[' << size(v) << "] {";
        for (char comma[]{0, 0}; const auto& s : v)
            std::cout << comma << ' ' << std::quoted(s), comma[0] = ',';
        std::cout << " }\n";
    }
     
    int main()
    {
        std::vector<std::string> p{"Alpha", "Bravo", "Charlie"}, q;
     
        print("p", p), print("q", q);
     
        using RI = std::reverse_iterator<std::vector<std::string>::iterator>;
     
        for (RI iter{p.rbegin()}, rend{p.rend()}; iter != rend; ++iter)
            q.emplace_back(/* ADL */ iter_move(iter));
     
        print("p", p), print("q", q);
    }
```

Saída possível: 
```
    p[3] { "Alpha", "Bravo", "Charlie" }
    q[0] { }
    p[3] { "", "", "" }
    q[3] { "Charlie", "Bravo", "Alpha" }
```

### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(desde C++20) | converte o resultado da desreferenciação de um objeto para o seu tipo de referência rvalue associado  
(objeto de ponto de customização)  
[ iter_move](<#/doc/iterator/move_iterator/iter_move>)(desde C++20) | converte o resultado da desreferenciação do iterator subjacente para o seu tipo de referência rvalue associado   
(função)  
[ move](<#/doc/utility/move>)(desde C++11) | converte o argumento para um xvalue   
(modelo de função)  
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(desde C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceções   
(modelo de função)  
[ forward](<#/doc/utility/forward>)(desde C++11) | encaminha um argumento de função e usa o argumento de template de tipo para preservar sua categoria de valor   
(modelo de função)  
[ ranges::move](<#/doc/algorithm/ranges/move>)(desde C++20) | move um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(desde C++20) | move um range de elementos para um novo local em ordem inversa  
(objeto de função de algoritmo)