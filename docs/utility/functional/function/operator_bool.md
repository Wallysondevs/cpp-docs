# std::function&lt;R(Args...)&gt;::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++11)
```

  
Verifica se *this armazena um alvo de função chamável, ou seja, não está vazio.

### Parâmetros

(nenhum) 

### Valor de retorno

true se *this armazena um alvo de função chamável, false caso contrário. 

### Exemplo

Execute este código
```cpp 
    #include <functional>
    #include <iostream>
     
    void sampleFunction()
    {
        std::cout << "This is the sample function!\n";
    }
     
    void checkFunc(std::function<void()> const& func)
    {
        // Use operator bool to determine if callable target is available.
        if (func)  
        {
            std::cout << "Function is not empty! Calling function.\n";
            func();
        }
        else
            std::cout << "Function is empty. Nothing to do.\n";
    }
     
    int main()
    {
        std::function<void()> f1;
        std::function<void()> f2(sampleFunction);
     
        std::cout << "f1: ";
        checkFunc(f1);
     
        std::cout << "f2: ";
        checkFunc(f2);
    }
```

Saída: 
```
    f1: Function is empty. Nothing to do.
    f2: Function is not empty! Calling function.
    This is the sample function!
```

### Veja também

[ operator bool](<#/doc/utility/functional/move_only_function/operator_bool>) | verifica se a `std::move_only_function` possui um alvo   
(função membro pública de `std::move_only_function`)  
---