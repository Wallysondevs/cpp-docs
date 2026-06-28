# std::enable_shared_from_this&lt;T&gt;::operator=

```cpp
enable_shared_from_this& operator=( const enable_shared_from_this &rhs ) noexcept;  // (desde C++11)
```

  
Não faz nada; retorna *this. 

### Parâmetros

rhs  |  \-  |  outro `enable_shared_from_this` para atribuir a *this  
  
### Valor de retorno

*this

### Observações

`_[weak_this](<#/doc/memory/enable_shared_from_this>)_` não é afetado pela atribuição. 

### Exemplo

Nota: enable_shared_from_this::operator= é definido como `protected` para prevenir "slicing" acidental, mas permitir que classes derivadas tenham operadores de atribuição padrão. 

Execute este código
```
    #include <iostream>
    #include <memory>
     
    class SharedInt : public std::enable_shared_from_this<SharedInt>
    {
    public:
        explicit SharedInt(int n) : mNumber(n) {}
        SharedInt(const SharedInt&) = default;
        SharedInt(SharedInt&&) = default;
        ~SharedInt() = default;
     
        // Ambos os operadores de atribuição usam enable_shared_from_this::operator=
        SharedInt& operator=(const SharedInt&) = default;
        SharedInt& operator=(SharedInt&&) = default;
     
        int number() const { return mNumber; }
     
    private:
        int mNumber;
    };
     
    int main()
    {
        std::shared_ptr<SharedInt> a = std::make_shared<SharedInt>(2);
        std::shared_ptr<SharedInt> b = std::make_shared<SharedInt>(4);
        *a = *b;
     
        std::cout << a->number() << '\n';
    }
```

Saída: 
```
    4
```

### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade de objeto compartilhada   
(modelo de classe)  