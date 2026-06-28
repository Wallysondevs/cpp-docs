# std::any::reset

```cpp
void reset() noexcept;  // (desde C++17)
```

  
Se *this contiver um valor, destrói o valor contido.

*this não contém um valor após esta chamada.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <any>
    #include <cassert>
    
    int main()
    {
        std::any a{42};
        assert(a.has_value());
        a.reset();
        assert(not a.has_value());
    }
```

### Veja também

[ has_value](<#/doc/utility/any/has_value>) | verifica se o objeto contém um valor   
(função membro pública)  