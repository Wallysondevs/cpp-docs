# std::function&lt;R(Args...)&gt;::target_type

```cpp
const std::type_info& target_type() const noexcept;  // (desde C++11)
```

Retorna o tipo da função armazenada.

### Parâmetros

(nenhum)

### Valor de retorno

typeid(T) se a função armazenada tiver o tipo `T`, caso contrário typeid(void)

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    
    int f(int a) { return -a; }
    void g(double) {}
    int main()
    {
        // fn1 e fn2 têm o mesmo tipo, mas seus alvos não
        std::function<int(int)> fn1(f),
                                fn2( {return -a;});
        std::cout << fn1.target_type().name() << '\n'
                  << fn2.target_type().name() << '\n';
    
        // desde C++17, os deduction guides (CTAD) podem ser usados
        std::cout << std::function{g}.target_type().name() << '\n';
    }
```

Saída possível:
```
    PFiiE
    Z4mainEUliE_
    PFvdE
```

### Veja também

[ target](<#/doc/utility/functional/function/target>) | obtém um ponteiro para o alvo armazenado
(função membro pública)
[ type_info](<#/doc/types/type_info>) | contém informações de algum tipo, a classe retornada pelo operador typeid
(classe)
**[`typeid`](<#/doc/language/typeid>)** | consulta informações de um tipo, retornando um objeto `std::type_info` que representa o tipo
(operador)