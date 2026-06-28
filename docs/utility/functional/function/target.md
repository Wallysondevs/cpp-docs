# std::function&lt;R(Args...)&gt;::target

```cpp
template< class T >
T* target() noexcept;  // (1) (desde C++11)
template< class T >
const T* target() const noexcept;  // (2) (desde C++11)
```

  
Retorna um ponteiro para o alvo da função invocável armazenada. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um ponteiro para a função armazenada se target_type() == typeid(T), caso contrário, um ponteiro nulo. 

### Exemplo

Execute este código
```cpp 
    #include <functional>
    #include <iostream>
     
    int f(int, int) { return 1; }
    int g(int, int) { return 2; }
    void test(std::function<int(int, int)> const& arg)
    {
        std::cout << "test function: ";
        if (arg.target<std::plus<int>>())
            std::cout << "it is plus\n";
        if (arg.target<std::minus<int>>())
            std::cout << "it is minus\n";
     
        int (*const* ptr)(int, int) = arg.target<int(*)(int, int)>();
        if (ptr && *ptr == f)
            std::cout << "it is the function f\n";
        if (ptr && *ptr == g)
            std::cout << "it is the function g\n";
    }
     
    int main()
    {
        test(std::function<int(int, int)>(std::plus<int>()));
        test(std::function<int(int, int)>(std::minus<int>()));
        test(std::function<int(int, int)>(f));
        test(std::function<int(int, int)>(g));
    }
```

Saída: 
```
    test function: it is plus
    test function: it is minus
    test function: it is the function f
    test function: it is the function g
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2591](<https://cplusplus.github.io/LWG/issue2591>) | C++11  | o comportamento é indefinido se `T` não for [Callable](<#/doc/named_req/Callable>) | o comportamento é definido (sempre retorna `nullptr`)   
  
### Veja também

[ target_type](<#/doc/utility/functional/function/target_type>) | obtém o typeid do alvo armazenado   
(função membro pública)  