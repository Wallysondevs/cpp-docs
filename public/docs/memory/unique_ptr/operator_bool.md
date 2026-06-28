# std::unique_ptr&lt;T,Deleter&gt;::operator bool

```cpp
explicit operator bool() const noexcept;  // (desde C++11)
(constexpr desde C++23)
```

  
Verifica se *this possui um objeto, isto é, se [get()](<#/doc/memory/unique_ptr/get>) `!=` nullptr. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se *this possui um objeto, false caso contrário. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    int main()
    {
        std::unique_ptr<int> ptr(new int(42));
     
        if (ptr)
            std::cout << "before reset, ptr is: " << *ptr << '\n';
        ptr.reset();
        (ptr ? (std::cout << "after reset, ptr is: " << *ptr)
            : (std::cout << "after reset ptr is empty")) << '\n';
    }
```

Saída: 
```
    before reset, ptr is: 42
    after reset ptr is empty
```

### Veja também

[ get](<#/doc/memory/unique_ptr/get>) |  retorna um ponteiro para o objeto gerenciado   
(função membro pública)  