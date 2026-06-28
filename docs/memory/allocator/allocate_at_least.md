# std::allocator&lt;T&gt;::allocate_at_least

```cpp
constexpr std::allocation_result<T*, std::size_t>
allocate_at_least( std::size_t n );  // (desde C++23)
```

  
Aloca `count * sizeof(T)` bytes de armazenamento não inicializado, onde `count` é um valor inteiro não especificado não menor que `n`, chamando ::[operator new](<#/doc/memory/new/operator_new>) (possivelmente com um argumento [std::align_val_t](<#/doc/memory/new/align_val_t>) adicional), mas é não especificado quando e como esta função é chamada.

Em seguida, esta função cria um array do tipo `T[count]` no armazenamento e inicia sua *lifetime*, mas não inicia a *lifetime* de nenhum de seus elementos.

Para usar esta função em uma expressão constante, o armazenamento alocado deve ser desalocado dentro da avaliação da mesma expressão.

O uso desta função é malformado se `T` for um [tipo incompleto](<#/doc/language/type-id>).

### Parâmetros

n  |  \-  |  o limite inferior do número de objetos para os quais alocar armazenamento   
  
### Valor de retorno

[std::allocation_result](<#/doc/memory/allocation_result>)<T*>{p, count}, onde `p` aponta para o primeiro elemento de um array de `count` objetos do tipo `T` cujos elementos ainda não foram construídos.

### Exceções

Lança [std::bad_array_new_length](<#/doc/memory/new/bad_array_new_length>) se [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::size_t](<#/doc/types/size_t>)>::max() / sizeof(T) < n, ou [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação falhar.

### Notas

`allocate_at_least` é fornecido principalmente para containers contíguos, por exemplo, [std::vector](<#/doc/container/vector>) e [std::basic_string](<#/doc/string/basic_string>), a fim de reduzir a realocação, fazendo com que sua capacidade corresponda ao tamanho realmente alocado quando possível.

A formulação "não especificado quando e como" torna possível [combinar ou otimizar alocações de heap](<#/doc/language/new>) feitas pelos containers da *standard library*, mesmo que tais otimizações sejam proibidas para chamadas diretas a ::[operator new](<#/doc/memory/new/operator_new>). Por exemplo, isso é implementado pelo libc++ ([1](<https://github.com/llvm-mirror/libcxx/blob/master@%7B2017-02-09%7D/include/memory#L1766-L1772>) e [2](<https://github.com/llvm-mirror/libcxx/blob/master@%7B2017-02-09%7D/include/new#L211-L217>)).

Após chamar [`allocate_at_least`](<#/doc/memory/allocator/allocate_at_least>) e antes da construção dos elementos, a aritmética de ponteiros de `T*` é bem definida dentro do array alocado, mas o comportamento é indefinido se os elementos forem acessados.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_allocate_at_least`](<#/doc/feature_test>) | [`202302L`](<#/>) | (C++23) | `allocate_at_least` etc.   
  
### Exemplo

Run this code
```
    #include <memory>
    #include <print>
     
    int main()
    {
        const std::size_t count{69};
        std::allocator<int> alloc;
        std::allocation_result res{alloc.allocate_at_least(count)};
        std::print("count: {}\n"
                   "res.ptr: {}\n"
                   "res.count: {}\n", count, res.ptr, res.count);
     
        /* constrói, usa e depois destrói os elementos */
     
        alloc.deallocate(res.ptr, res.count);
    }
```

Saída possível: 
```
    count: 69
    res.ptr: 0x555a486a0960
    res.count: 96
```

### Ver também

[ allocation_result](<#/doc/memory/allocation_result>)(C++23) | registra o endereço e o tamanho real do armazenamento alocado por `allocate_at_least`   
(modelo de classe)  
[ allocate_at_least](<#/doc/memory/allocator_traits/allocate_at_least>)[static] (C++23) | aloca armazenamento pelo menos tão grande quanto o tamanho solicitado via um alocador   
(função membro estática pública de `std::allocator_traits<Alloc>`)