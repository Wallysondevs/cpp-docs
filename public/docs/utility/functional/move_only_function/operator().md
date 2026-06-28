# std::move_only_function::operator()

```cpp
R operator()( Args... args ) /*cv*/ /*ref*/ noexcept(/*noex*/);  // (desde C++23)
```

  
Invoca o alvo invocável armazenado com os parâmetros `args`. As partes /*cv*/, /*ref*/ e /*noex*/ do operator() são idênticas às do parâmetro de template de `std::move_only_function`.

Equivalente a return [std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(/*cv-ref-cast*/(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...);, onde `f` é um lvalue não qualificado por cv que denota o objeto alvo de *this, e /*cv-ref-cast*/(f) é equivalente a:

  * f se cv ref for vazio ou &, ou
  * [std::as_const](<#/doc/utility/as_const>)(f) se cv ref for const ou const &, ou
  * std::move(f) se cv ref for &&, ou
  * std::move([std::as_const](<#/doc/utility/as_const>)(f)) se cv ref for const &&.

O comportamento é indefinido se *this estiver vazio.

### Parâmetros

args  |  \-  |  parâmetros a serem passados para o alvo invocável armazenado   
  
### Valor de retorno

[std::invoke_r](<#/doc/utility/functional/invoke>)&lt;R&gt;(/*cv-ref-cast*/(f), [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...).

### Exceções

Propaga a exceção lançada pela chamada de função subjacente.

### Exemplo

O exemplo a seguir mostra como `std::move_only_function` pode ser passado para outras funções por valor. Além disso, ele mostra como `std::move_only_function` pode armazenar lambdas.

Run this code
```cpp
    #include <iostream>
    #include <functional>
    
    void call(std::move_only_function<int() const> f)  // can be passed by value
    { 
        std::cout << f() << '\n';
    }
    
    int normal_function() 
    {
        return 42;
    }
    
    int main()
    {
        int n = 1;
        auto lambda = &n{ return n; };
        std::move_only_function<int() const> f = lambda;
        call(std::move(f));
    
        n = 2;
        call(lambda); 
    
        f = normal_function; 
        call(std::move(f));
    }
```

Saída:
```
    1
    2
    42
```

### Veja também

[ operator()](<#/>) |  invoca o alvo   
(função membro pública de `std::function<R(Args...)>`)  
[ operator()](<#/>) |  chama a função armazenada   
(função membro pública de `std::reference_wrapper<T>`)  
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) |  invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)   
(modelo de função)