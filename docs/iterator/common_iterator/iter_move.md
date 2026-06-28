# iter_move(std::common_iterator)

```cpp
friend constexpr decltype(auto) iter_move( const std::common_iterator& i )
noexcept(noexcept(ranges::iter_move(std::declval<const I&>()))
requires std::input_iterator<I>;  // (desde C++20)
```

  
Converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado.

O corpo da função é equivalente a: `return std::[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(std::get<I>(i.var));`.

Esta função não é visível para pesquisa [não qualificada](<#/doc/language/unqualified_lookup>) ou [qualificada](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [pesquisa dependente de argumento](<#/doc/language/adl>) quando `std::common_iterator<I, S>` é uma classe associada dos argumentos.

Se `i.var` não contiver um objeto `I` (ou seja, um iterator), o comportamento é indefinido.

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
        std::cout << rem << '[' << size(v) << "] { ";
        for (int o{}; auto const& s : v)
            std::cout << (o++ ? ", " : "") << std::quoted(s);
        std::cout << " }\n";
    }
     
    int main()
    {
        std::vector<std::string> p{"Andromeda", "Cassiopeia", "Phoenix"}, q;
        print("p", p);
        print("q", q);
     
        using CTI = std::counted_iterator<std::vector<std::string>::iterator>;
        using CI = std::common_iterator<CTI, std::default_sentinel_t>;
        CI last{std::default_sentinel};
     
        for (CI first{{p.begin(), 2}}; first != last; ++first)
            q.emplace_back(/* ADL */ iter_move(first));
     
        print("p", p);
        print("q", q);
    }
```

Saída possível: 
```
    p[3] { "Andromeda", "Cassiopeia", "Phoenix" }
    q[0] {  }
    p[3] { "", "", "Phoenix" }
    q[2] { "Andromeda", "Cassiopeia" }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3953](<https://cplusplus.github.io/LWG/issue3953>) | C++20  | o tipo de retorno era `std::iter_rvalue_reference_t<I>` | alterado para `decltype(auto)`  
  
### Veja também

[ iter_move](<#/doc/iterator/ranges/iter_move>)(C++20) |  converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado  
(objeto de ponto de customização)  
[ iter_move](<#/doc/iterator/counted_iterator/iter_move>)(C++20) |  converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado   
(função)  
[ move](<#/doc/utility/move>)(C++11) |  converte o argumento para um xvalue   
(modelo de função)  
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) |  converte o argumento para um xvalue se o construtor de movimento não lançar exceção   
(modelo de função)  
[ forward](<#/doc/utility/forward>)(C++11) |  encaminha um argumento de função e usa o argumento de tipo do template para preservar sua categoria de valor   
(modelo de função)  
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) |  move um range de elementos para um novo local  
(objeto de função de algoritmo)  
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(C++20) |  move um range de elementos para um novo local em ordem inversa  
(objeto de função de algoritmo)