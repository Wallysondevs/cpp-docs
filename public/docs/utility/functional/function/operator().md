# std::function&lt;R(Args...)&gt;::operator()

```cpp
R operator()( Args... args ) const;  // (desde C++11)
```

  
Invoca o alvo de função invocável armazenado com os parâmetros args. 

Efetivamente executa [`_INVOKE <R>_`](<#/doc/utility/functional>)(f, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...), onde f é o [objeto alvo](<#/doc/utility/functional/function>) deste *this. 

### Parâmetros

args  |  \-  |  parâmetros a serem passados para o alvo de função invocável armazenado   
  
### Valor de retorno

Nenhum se `R` for `void`. Caso contrário, o valor de retorno da invocação do objeto invocável armazenado. 

### Exceções

Lança [std::bad_function_call](<#/doc/utility/functional/bad_function_call>) se *this não armazena um alvo de função invocável, ou seja, !*this == true. 

### Exemplo

O exemplo a seguir mostra como [std::function](<#/doc/utility/functional/function>) pode ser passado para outras funções por valor. Além disso, ele mostra como [std::function](<#/doc/utility/functional/function>) pode armazenar lambdas.

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    
    void call(std::function<int()> f) // can be passed by value
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
        std::function<int()> f;
        try
        {
            call(f);
        }
        catch (const std::bad_function_call& ex)
        {
            std::cout << ex.what() << '\n';
        }
    
        f = &n{ return n; };
        call(f);
    
        n = 2;
        call(f);
    
        f = normal_function;
        call(f);
    
        std::function<void(std::string, int)> g;
        g =  { std::cout << str << ' ' << i << '\n'; };
        g("Hi", 052);
    }
```

Saída possível: 
```
    bad_function_call
    1
    2
    42
    Hi 42
```

### Veja também

[ operator()](<#/>) |  invoca o alvo   
(função membro pública de `std::move_only_function`)  
[ operator()](<#/>) |  chama a função armazenada   
(função membro pública de `std::reference_wrapper<T>`)  
[ bad_function_call](<#/doc/utility/functional/bad_function_call>)(C++11) |  a exceção lançada ao invocar um [std::function](<#/doc/utility/functional/function>) vazio   
(classe)  
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) |  invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)   
(modelo de função)