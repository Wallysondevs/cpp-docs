# std::reference_wrapper&lt;T&gt;::operator()

```cpp
template< class... ArgTypes >
typename std::result_of<T&(ArgTypes&&...)>::type
operator() ( ArgTypes&&... args ) const;  // (desde C++11)
(até C++17)
template< class... ArgTypes >
std::invoke_result_t<T&, ArgTypes...>
operator() ( ArgTypes&&... args ) const noexcept(/* see below */);  // (desde C++17)
(constexpr desde C++20)
```

  
Chama o objeto [Callable](<#/doc/named_req/Callable>), cuja referência está armazenada, como se fosse por [`_INVOKE_`](<#/doc/utility/functional>)([`get()`](<#/doc/utility/functional/reference_wrapper/get>), [std::forward](<#/doc/utility/forward>)&lt;ArgTypes&gt;(args)...). Esta função está disponível apenas se a referência armazenada aponta para um objeto [Callable](<#/doc/named_req/Callable>). 

`T` deve ser um tipo completo. 

### Parâmetros

args  |  \-  |  argumentos a serem passados para a função chamada   
  
### Valor de retorno

O valor de retorno da função chamada. 

### Exceções

```cpp
Pode lançar exceções definidas pela implementação.  // (desde C++11)
(até C++17)
especificação `noexcept`: noexcept(std::is_nothrow_invocable_v<T&, ArgTypes...>)  // (desde C++17)
```
  
### Exemplo

Execute este código
```cpp 
    #include <functional>
    #include <iostream>
    
    void f1()
    {
        std::cout << "reference to function called\n";
    }
    
    void f2(int n)
    {
        std::cout << "bind expression called with " << n << " as the argument\n";
    }
    
    int main()
    {
        std::reference_wrapper<void()> ref1 = std::ref(f1);
        ref1();
    
        auto b = std::bind(f2, std::placeholders::_1);
        auto ref2 = std::ref(b);
        ref2(7);
    
        auto c = []{ std::cout << "lambda function called\n"; };
        auto ref3 = std::ref(c);
        ref3();
    }
```

Saída: 
```
    reference to function called
    bind expression called with 7 as the argument
    lambda function called
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3764](<https://cplusplus.github.io/LWG/issue3764>) | C++17  | operator() não é noexcept | propagar noexcept  
  
### Veja também

[ getoperator T&](<#/doc/utility/functional/reference_wrapper/get>) |  acessa a referência armazenada   
(função membro pública)  