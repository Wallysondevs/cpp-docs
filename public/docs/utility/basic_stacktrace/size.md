# std::basic_stacktrace&lt;Allocator&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++23)
```

Retorna o número de entradas no stacktrace.

### Parâmetros

(nenhum)

### Valor de retorno

O número de entradas no stacktrace.

### Complexidade

Constante.

### Exemplo

O código a seguir usa `size` para exibir o número de entradas no stacktrace atual:

Execute este código
```cpp
    #include <stacktrace>
    #include <iostream>
     
    int main()
    { 
        auto trace = std::stacktrace::current();
     
        std::cout << "trace contains " << trace.size() << " entries.\n";
    }
```

Saída possível:
```
    trace contains 3 entries.
```

### Veja também

[ empty](<#/doc/utility/basic_stacktrace/empty>) | verifica se o `basic_stacktrace` está vazio
(função membro pública)
[ max_size](<#/doc/utility/basic_stacktrace/max_size>) | retorna o número máximo possível de entradas do stacktrace
(função membro pública)