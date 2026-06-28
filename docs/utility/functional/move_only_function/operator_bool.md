# std::move_only_function::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++23)
```

  
Verifica se *this armazena um alvo chamável, ou seja, não está vazio. 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se *this armazena um alvo chamável, `false` caso contrário. 

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
     
    void sampleFunction()
    {
        std::cout << "Esta é a função de exemplo!\n";
    }
     
    void checkFunc(std::move_only_function<void() const> const& func)
    {
        // Usa operator bool para determinar se um alvo chamável está disponível.
        if (func)
        {
            std::cout << "A função não está vazia! Chamando a função.\n";
            func();
        }
        else
            std::cout << "A função está vazia. Nada a fazer.\n";
    }
     
    int main()
    {
        std::move_only_function<void() const> f1{};
        std::move_only_function<void() const> f2{sampleFunction};
     
        std::cout << "f1: ";
        checkFunc(f1);
     
        std::cout << "f2: ";
        checkFunc(f2);
    }
```

Saída: 
```
    f1: A função está vazia. Nada a fazer.
    f2: A função não está vazia! Chamando a função.
    Esta é a função de exemplo!
```

### Veja também

[ operator==](<#/>)(C++23) | compara uma `std::move_only_function` com nullptr   
(função)  
[ operator bool](<#/doc/utility/functional/function/operator_bool>) | verifica se um alvo está contido   
(função membro pública de `std::function<R(Args...)>`)  
---