# operator==, !=, &lt;, &lt;=, &gt;, &gt;=, &lt;=&gt;(std::variant)

Definido no cabeçalho `[<variant>](<#/doc/header/variant>)`

```c
template< class... Types >
constexpr bool operator==( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
template< class... Types >
constexpr bool operator!=( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
template< class... Types >
constexpr bool operator<( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
template< class... Types >
constexpr bool operator>( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
template< class... Types >
constexpr bool operator<=( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
template< class... Types >
constexpr bool operator>=( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
template< class... Types >
constexpr std::common_comparison_category_t
<std::compare_three_way_result_t<Types>...>
operator<=>( const std::variant<Types...>& lhs,
const std::variant<Types...>& rhs );
Modelo de função auxiliar
template< std::size_t I, class... Types >
constexpr const std::variant_alternative_t<I, std::variant<Types...>>&
GET( const variant<Types...>& v );
```

  
Realiza operações de comparação em objetos [std::variant](<#/doc/utility/variant>). 

1-7) Compara dois objetos [std::variant](<#/doc/utility/variant>) lhs e rhs. Os valores contidos são comparados (usando o operador correspondente de `T`) apenas se ambos lhs e rhs contiverem valores correspondentes ao mesmo índice. Caso contrário, 

  * lhs é considerado _igual a_ rhs se, e somente se, ambos lhs e rhs não contiverem um valor. 
  * lhs é considerado _menor que_ rhs se, e somente se, rhs contiver um valor e lhs não, ou lhs.index() for menor que rhs.index().

1-6) Seja @ o operador de comparação correspondente, para cada uma dessas funções: Se, para alguns valores de I, a expressão correspondente `_GET_` ﻿&lt;I&gt;(lhs) @` ` _GET_` ﻿&lt;I&gt;(rhs) for malformada ou seu resultado não for conversível para bool, o programa é malformado.  | (até C++26)  
---|---
Esta sobrecarga participa da resolução de sobrecarga somente se, para todos os valores de I, a expressão correspondente `_GET_` ﻿&lt;I&gt;(lhs) @` ` _GET_` ﻿&lt;I&gt;(rhs) for bem-formada e seu resultado for conversível para bool.  | (desde C++26)  
  
8) O modelo de função apenas para exposição `_GET_` se comporta como [`std::get(std::variant)`](<#/doc/utility/variant/get>), exceto que [std::bad_variant_access](<#/doc/utility/variant/bad_variant_access>) nunca é lançada.

Se I < sizeof...(Types) for falso, o programa é malformado.

Se I == v.index() for falso, o comportamento é indefinido.

### Parâmetros

lhs,rhs  |  \-  |  variants para comparar   
  
### Valor de retorno

Operador  | Ambos os operandos contêm um valor  
---|---
(seja I lhs.index() e J rhs.index()) | lhs ou rhs não tem valor  
(seja lhs_empty lhs.valueless_by_exception() e rhs_empty rhs.valueless_by_exception())  
I e J são iguais  | I e J são diferentes   
---|---|---|---
== | `_GET_` ﻿&lt;I&gt;(lhs) ==` ` _GET_` ﻿&lt;I&gt;(rhs) | false | lhs_empty && rhs_empty  
!= | `_GET_` ﻿&lt;I&gt;(lhs) !=` ` _GET_` ﻿&lt;I&gt;(rhs) | true | lhs_empty != rhs_empty  
< | `_GET_` ﻿&lt;I&gt;(lhs) <` ` _GET_` ﻿&lt;I&gt;(rhs) | lhs.index() < rhs.index() | lhs_empty && !rhs_empty  
> | `_GET_` ﻿&lt;I&gt;(lhs) >` ` _GET_` ﻿&lt;I&gt;(rhs) | lhs.index() > rhs.index() | !lhs_empty && rhs_empty  
<= | `_GET_` ﻿&lt;I&gt;(lhs) <=` ` _GET_` ﻿&lt;I&gt;(rhs) | lhs.index() < rhs.index() | lhs_empty  
>= | `_GET_` ﻿&lt;I&gt;(lhs) >=` ` _GET_` ﻿&lt;I&gt;(rhs) | lhs.index() > rhs.index() | rhs_empty  
<=> | `_GET_` ﻿&lt;I&gt;(lhs) <=>` ` _GET_` ﻿&lt;I&gt;(rhs) | lhs.index() <=> rhs.index() | veja abaixo   
  
Para o operador<=>: 

  * Se apenas lhs não tiver valor, retorna [`std::strong_ordering::less`](<#/doc/utility/compare/strong_ordering>). 
  * Se apenas rhs não tiver valor, retorna [`std::strong_ordering::greater`](<#/doc/utility/compare/strong_ordering>). 
  * Se ambos lhs e rhs não tiverem valor, retorna [`std::strong_ordering::equal`](<#/doc/utility/compare/strong_ordering>). 

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_constrained_equality`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | operadores de comparação restritos para [std::variant](<#/doc/utility/variant>)  
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <variant>
    
    int main()
    {
        std::cout << std::boolalpha;
        std::string cmp;
        bool result;
    
        auto print2 = &cmp, &result
        {
            std::cout << lhs << ' ' << cmp << ' ' << rhs << " : " << result << '\n';
        };
    
        std::variant<int, std::string> v1, v2;
    
        std::cout << "operator==\n";
        {
            cmp = "==";
    
            // by default v1 = 0, v2 = 0;
            result = v1 == v2; // true
            std::visit(print2, v1, v2);
    
            v1 = v2 = 1;
            result = v1 == v2; // true
            std::visit(print2, v1, v2);
    
            v2 = 2;
            result = v1 == v2; // false
            std::visit(print2, v1, v2);
    
            v1 = "A";
            result = v1 == v2; // false: v1.index == 1, v2.index == 0
            std::visit(print2, v1, v2);
    
            v2 = "B";
            result = v1 == v2; // false
            std::visit(print2, v1, v2);
    
            v2 = "A";
            result = v1 == v2; // true
            std::visit(print2, v1, v2);
        }
    
        std::cout << "operator<\n";
        {
            cmp = "<";
    
            v1 = v2 = 1;
            result = v1 < v2; // false
            std::visit(print2, v1, v2);
    
            v2 = 2;
            result = v1 < v2; // true
            std::visit(print2, v1, v2);
    
            v1 = 3;
            result = v1 < v2; // false
            std::visit(print2, v1, v2);
    
            v1 = "A"; v2 = 1;
            result = v1 < v2; // false: v1.index == 1, v2.index == 0
            std::visit(print2, v1, v2);
    
            v1 = 1; v2 = "A";
            result = v1 < v2; // true: v1.index == 0, v2.index == 1
            std::visit(print2, v1, v2);
    
            v1 = v2 = "A";
            result = v1 < v2; // false
            std::visit(print2, v1, v2);
    
            v2 = "B";
            result = v1 < v2; // true
            std::visit(print2, v1, v2);
    
            v1 = "C";
            result = v1 < v2; // false
            std::visit(print2, v1, v2);
        }
    
        {
            std::variant<int, std::string> v1;
            std::variant<std::string, int> v2;
        //  v1 == v2; // Compilation error: no known conversion
        }
    
        // TODO: C++20 three-way comparison operator <=> for variants
    }
```

Saída: 
```
    operator==
    0 == 0 : true
    1 == 1 : true
    1 == 2 : false
    A == 2 : false
    A == B : false
    A == A : true
    operator<
    1 < 1 : false
    1 < 2 : true
    3 < 2 : false
    A < 1 : false
    1 < A : true
    A < A : false
    A < B : true
    C < B : false
```

### Veja também

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/optional/operator_cmp>)(C++17)(C++17)(C++17)(C++17)(C++17)(C++17)(C++20) |  compara objetos `optional`   
(modelo de função)  