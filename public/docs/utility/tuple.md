# std::tuple

Definido no header `[<tuple>](<#/doc/header/tuple>)`

```cpp
template< class... Types >
class tuple;  // (desde C++11)
```

  
O template de classe `std::tuple` é uma coleção de tamanho fixo de valores heterogêneos. É uma generalização de [std::pair](<#/doc/utility/pair>). 

Se [std::is_trivially_destructible](<#/doc/types/is_destructible>)&lt;Ti&gt;::value for true para cada `Ti` em `Types`, o destrutor de `std::tuple` é trivial. 

Se um programa declara uma especialização [explícita](<#/doc/language/template_specialization>) ou [parcial](<#/doc/language/partial_specialization>) de `std::tuple`, o programa é malformado, sem diagnóstico requerido. 

### Parâmetros de template

Types...  |  \-  |  os tipos dos elementos que a tuple armazena. Lista vazia é suportada.   
  
### Funções membro

[ (construtor)](<#/doc/utility/tuple/tuple>) |  constrói uma nova `tuple`   
(função membro pública)  
[ operator=](<#/>) |  atribui o conteúdo de uma `tuple` a outra   
(função membro pública)  
[ swap](<#/doc/utility/tuple/swap>) |  troca o conteúdo de duas `tuple`s   
(função membro pública)  
  
### Funções não-membro

[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) |  cria um objeto `tuple` do tipo definido pelos tipos dos argumentos   
(template de função)  
[ tie](<#/doc/utility/tuple/tie>)(C++11) |  cria uma **tuple** de referências lvalue ou desempacota uma tuple em objetos individuais   
(template de função)  
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) |  cria uma `tuple` de [forwarding references](<#/doc/language/reference>)   
(template de função)  
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) |  cria uma `tuple` concatenando qualquer número de tuples   
(template de função)  
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) |  tuple acessa o elemento especificado   
(template de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/tuple/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) |  compara lexicograficamente os valores na tuple   
(template de função)  
[ std::swap(std::tuple)](<#/doc/utility/tuple/swap2>)(C++11) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(template de função)  
  
### Concepts auxiliares

[_tuple-like pair-like_](<#/doc/utility/tuple/tuple-like>)(C++23) |  especifica que um tipo implementou o _protocolo tuple_  
([`std::get`](<#/doc/utility/tuple/get>), [`std::tuple_element`](<#/doc/utility/tuple_element>), [`std::tuple_size`](<#/doc/utility/tuple_size>))  
(concept apenas para exposição*)  
  
### Classes auxiliares

[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(C++11) |  obtém o tamanho de uma `tuple`   
(especialização de template de classe)  
[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) |  obtém o tipo do elemento especificado   
(especialização de template de classe)  
[ std::uses_allocator<std::tuple>](<#/doc/utility/tuple/uses_allocator>)(C++11) |  especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)   
(especialização de template de classe)  
[ std::basic_common_reference<_tuple-like_ >](<#/doc/utility/tuple/basic_common_reference>)(C++23) |  determina o tipo de referência comum de uma `tuple` e um tipo `_tuple-like_`   
(especialização de template de classe)  
[ std::common_type<_tuple-like_ >](<#/doc/utility/tuple/common_type>)(C++23) |  determina o tipo comum de uma `tuple` e um tipo `_tuple-like_`   
(especialização de template de classe)  
[ std::formatter<std::tuple>](<#/doc/utility/format/tuple_formatter>)(C++23) |  suporte de formatação para `tuple`   
(especialização de template de classe)  
[ ignore](<#/doc/utility/tuple/ignore>)(C++11) |  placeholder para pular um elemento ao desempacotar uma `tuple` usando [`tie`](<#/doc/utility/tuple/tie>)   
(constante)  
  
### Especializações auxiliares

```cpp
template< class... Ts >
constexpr bool enable_nonlocking_formatter_optimization<std::tuple<Ts...>>
= (enable_nonlocking_formatter_optimization<Ts> && ...);  // (desde C++23)
```

  
Esta especialização de [`std::enable_nonlocking_formatter_optimization`](<#/doc/utility/format/enable_nonlocking_formatter_optimization>) permite a implementação eficiente de [`std::print`](<#/doc/io/print>) e [`std::println`](<#/doc/io/println>) para imprimir um objeto `tuple` quando cada tipo de elemento o permite. 

### [Deduction guides](<#/doc/utility/tuple/deduction_guides>) (desde C++17)

### Notas

Como a "forma" de uma tuple – seu tamanho, os tipos de seus elementos e a ordem desses tipos – fazem parte de sua assinatura de tipo, todos devem estar disponíveis em tempo de compilação e só podem depender de outras informações de tempo de compilação. Isso significa que muitas operações condicionais em tuples – em particular, prepend/append condicional e filtro – só são possíveis se as condições puderem ser avaliadas em tempo de compilação. Por exemplo, dada uma std::tuple<int, double, int>, é possível filtrar por tipos – por exemplo, retornando uma std::tuple<int, int> – mas não filtrar se cada elemento é positivo ou não (o que teria uma assinatura de tipo diferente dependendo dos valores de tempo de execução da tuple), a menos que todos os elementos fossem eles próprios constexpr. 

Como solução alternativa, pode-se trabalhar com tuples de [std::optional](<#/doc/utility/optional>), mas ainda não há como ajustar o tamanho com base em informações de tempo de execução. 

Até [N4387](<https://wg21.link/N4387>) (aplicado como um relatório de defeito para C++11), uma função não podia retornar uma tuple usando copy-list-initialization: 
```cpp
    std::tuple<int, int> foo_tuple()
    {
        return {1, -1};  // Erro até N4387
        return std::tuple<int, int>{1, -1}; // Sempre funciona
        return std::make_tuple(1, -1); // Sempre funciona
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <stdexcept>
    #include <string>
    #include <tuple>
    
    std::tuple<double, char, std::string> get_student(int id)
    {
        switch (id)
        {
            case 0: return {3.8, 'A', "Lisa Simpson"};
            case 1: return {2.9, 'C', "Milhouse Van Houten"};
            case 2: return {1.7, 'D', "Ralph Wiggum"};
            case 3: return {0.6, 'F', "Bart Simpson"};
        }
    
        throw std::invalid_argument("id");
    }
    
    int main()
    {
        const auto student0 = get_student(0);
        std::cout << "ID: 0, "
                  << "GPA: " << std::get<0>(student0) << ", "
                  << "grade: " << std::get<1>(student0) << ", "
                  << "name: " << std::get<2>(student0) << '\n';
    
        const auto student1 = get_student(1);
        std::cout << "ID: 1, "
                  << "GPA: " << std::get<double>(student1) << ", "
                  << "grade: " << std::get<char>(student1) << ", "
                  << "name: " << std::get<std::string>(student1) << '\n';
    
        double gpa2;
        char grade2;
        std::string name2;
        std::tie(gpa2, grade2, name2) = get_student(2);
        std::cout << "ID: 2, "
                  << "GPA: " << gpa2 << ", "
                  << "grade: " << grade2 << ", "
                  << "name: " << name2 << '\n';
    
        // C++17 structured binding:
        const auto [gpa3, grade3, name3] = get_student(3);
        std::cout << "ID: 3, "
                  << "GPA: " << gpa3 << ", "
                  << "grade: " << grade3 << ", "
                  << "name: " << name3 << '\n';
    }
```

Saída: 
```
    ID: 0, GPA: 3.8, grade: A, name: Lisa Simpson
    ID: 1, GPA: 2.9, grade: C, name: Milhouse Van Houten
    ID: 2, GPA: 1.7, grade: D, name: Ralph Wiggum
    ID: 3, GPA: 0.6, grade: F, name: Bart Simpson
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
[LWG 2796](<https://cplusplus.github.io/LWG/issue2796>) | C++11  | trivialidade do destrutor de `std::tuple` era não especificada  | especificada   
[LWG 3990](<https://cplusplus.github.io/LWG/issue3990>) | C++11  | um programa podia declarar uma especialização explícita ou  
parcial de `std::tuple` | o programa é malformado neste  
caso (sem diagnóstico requerido)   
  
### Referências

  * Padrão C++23 (ISO/IEC 14882:2024): 

    

  * 22.4 Tuples [tuple] 

  * Padrão C++20 (ISO/IEC 14882:2020): 

    

  * 20.5 Tuples [tuple] 

  * Padrão C++17 (ISO/IEC 14882:2017): 

    

  * 23.5 Tuples [tuple] 

  * Padrão C++14 (ISO/IEC 14882:2014): 

    

  * 20.4 Tuples [tuple] 

  * Padrão C++11 (ISO/IEC 14882:2011): 

    

  * 20.4 Tuples [tuple] 

### Veja também

[ pair](<#/doc/utility/pair>) |  implementa tuple binária, ou seja, um par de valores   
(template de classe)  