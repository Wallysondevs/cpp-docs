# iter_move(std::counted_iterator)

```cpp
friend constexpr decltype(auto) iter_move( const std::counted_iterator& i )
noexcept(noexcept(ranges::iter_move(i.base())))
requires std::input_iterator<I>;  // (desde C++20)
```

  
Converte o resultado da desreferenciação do iterator subjacente para o seu tipo de referência rvalue associado.

O corpo da função é equivalente a return [ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.base());.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando [std::counted_iterator](<#/doc/iterator/counted_iterator>)&lt;I&gt; é uma classe associada dos argumentos.

Se i.count() for igual a ​0​, o comportamento é indefinido.

### Parâmetros

i  |  \-  |  um adaptador de iterator de origem   
  
### Valor de retorno

Uma referência rvalue ou um prvalue temporário.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    void print(auto const& rem, auto const& v)
    {
        std::cout << rem << '[' << size(v) << "] {";
        for (char comma[]{0, ' ', 0}; auto const& s : v)
            std::cout << comma << std::quoted(s), *comma = ',';
        std::cout << "}\n";
    }
    
    int main()
    {
        std::vector<std::string> p{"Alpha", "Bravo", "Charlie"}, q;
        print("p", p);
        print("q", q);
    
        using RI = std::counted_iterator<std::vector<std::string>::iterator>;
    
        for (RI iter{p.begin(), 2}; iter != std::default_sentinel; ++iter)
            q.emplace_back(/* ADL */ iter_move(iter));
    
        print("p", p);
        print("q", q);
    }
```

Saída possível:
```
    p[3] {"Alpha", "Bravo", "Charlie"}
    q[0] {}
    p[3] {"", "", "Charlie"}
    q[2] {"Alpha", "Bravo"}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3953](<https://cplusplus.github.io/LWG/issue3953>) | C++20  | o tipo de retorno era [std::iter_rvalue_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt; | alterado para decltype(auto)  
  
### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) | converte o resultado da desreferenciação de um objeto para o seu tipo de referência rvalue associado  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/iterator/counted_iterator/iter_swap>)(C++20) | troca os objetos apontados por dois iterators subjacentes   
(modelo de função)  
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue   
(modelo de função)  
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceção   
(modelo de função)  
[ forward](<#/doc/utility/forward>)(C++11) | encaminha um argumento de função e usa o argumento de modelo de tipo para preservar sua categoria de valor   
(modelo de função)  
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) | move um range de elementos para um novo local em ordem inversa  
(objeto de função de algoritmo)