# std::is_execution_policy

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
template< class T >
struct is_execution_policy;
```

  
Verifica se `T` é um tipo de política de execução padrão ou definido pela implementação.

Fornece a constante membro value que é igual a true, se `T` for [um tipo de política de execução padrão](<#/doc/algorithm/execution_policy_tag_t>), ou um tipo de política de execução definido pela implementação. Caso contrário, value é igual a false.

Se o programa adicionar especializações para `std::is_execution_policy` ou `std::is_execution_policy_v`, o comportamento é indefinido.

### Parâmetros de template

T  |  \-  |  um tipo a ser verificado   
  
### Template auxiliar

Definido no cabeçalho `[<execution>](<#/doc/header/execution>)`

```c
template< class T >
constexpr bool is_execution_policy_v = std::is_execution_policy<T>::value;
```

  
##  Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

###  Constantes membro

value[static] |  true se `T` for um tipo de política de execução padrão ou definido pela implementação, false caso contrário   
(constante membro estática pública)  
  
###  Funções membro

operator bool |  converte o objeto para bool, retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
###  Tipos membro

Type  |  Definição   
---|---
`value_type` |  bool  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>  
  
Executar este código
```
    #include <execution>
     
    static_assert(std::is_execution_policy_v<std::execution::unsequenced_policy>);
    static_assert(!std::is_execution_policy_v<int>);
     
    int main() {}
```

### Ver também

[ sequenced_policyparallel_policyparallel_unsequenced_policyunsequenced_policy](<#/doc/algorithm/execution_policy_tag_t>)(C++17)(C++17)(C++17)(C++20) |  tipos de política de execução   
(classe)  
[ seqparpar_unsequnseq](<#/doc/algorithm/execution_policy_tag>)(C++17)(C++17)(C++17)(C++20) |  objetos de política de execução globais   
(constante)