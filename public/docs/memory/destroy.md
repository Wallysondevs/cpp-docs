# std::destroy

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class ForwardIt >
void destroy( ForwardIt first, ForwardIt last );
(ate C++20)
template< class ForwardIt >
constexpr void destroy( ForwardIt first, ForwardIt last );
template< class ExecutionPolicy, class ForwardIt >
void destroy( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last );
```

  
1) Destrói os objetos no range `[`first`, `last`)`, como se por 
```
    for (; first != last; ++first)
        std::destroy_at(std::addressof(*first));
```

2) O mesmo que (1), mas executado de acordo com a policy. Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:  [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true.  | (ate C++20)  
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true.  | (desde C++20)  
  
### Parâmetros

first, last  |  \-  |  o range de elementos a serem destruídos   
---|---|---
policy  |  \-  |  a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada   
Requisitos de tipo   
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).   
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `ForwardIt` pode lançar exceções.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear na distância entre first e last. 

### Exceções

A sobrecarga com um parâmetro template nomeado `ExecutionPolicy` reporta erros da seguinte forma: 

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação. 
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada. 

### Possível implementação
```
    template<class ForwardIt>
    constexpr // desde C++20
    void destroy(ForwardIt first, ForwardIt last)
    {
        for (; first != last; ++first)
            std::destroy_at(std::addressof(*first));
    }
```
  
---  
  
### Exemplo

O exemplo a seguir demonstra como usar `destroy` para destruir uma sequência contígua de elementos. 

Execute este código
```
    #include <iostream>
    #include <memory>
    #include <new>
     
    struct Tracer
    {
        int value;
        ~Tracer() { std::cout << value << " destructed\n"; }
    };
     
    int main()
    {
        alignas(Tracer) unsigned char buffer[sizeof(Tracer) * 8];
     
        for (int i = 0; i < 8; ++i)
            new(buffer + sizeof(Tracer) * i) Tracer{i}; //constrói objetos manualmente
     
        auto ptr = std::launder(reinterpret_cast<Tracer*>(buffer));
     
        std::destroy(ptr, ptr + 8);
    }
```

Saída: 
```
    0 destruído
    1 destruído
    2 destruído
    3 destruído
    4 destruído
    5 destruído
    6 destruído
    7 destruído
```

### Veja também

[ destroy_n](<#/doc/memory/destroy_n>)(C++17) |  destrói um número de objetos em um range   
(modelo de função)  
[ destroy_at](<#/doc/memory/destroy_at>)(C++17) |  destrói um objeto em um endereço dado   
(modelo de função)  
[ ranges::destroy](<#/doc/memory/ranges/destroy>)(C++20) |  destrói um range de objetos  
(objeto de função de algoritmo)