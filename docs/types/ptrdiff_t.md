# std::ptrdiff_t

Definido no cabeçalho `[<cstddef>](<#/doc/header/cstddef>)`

```c
typedef /*implementation-defined*/ ptrdiff_t;
```

`std::ptrdiff_t` é o tipo inteiro com sinal do resultado da subtração de dois ponteiros.

A largura em bits de `std::ptrdiff_t` não é menor que 17. | (desde C++11)

### Notas

`std::ptrdiff_t` é usado para [aritmética de ponteiros](<#/doc/language/operator_arithmetic>) e indexação de arrays, se valores negativos forem possíveis. Programas que usam outros tipos, como int, podem falhar em, por exemplo, sistemas de 64 bits quando o índice excede [INT_MAX](<#/doc/types/climits>) ou se dependem de aritmética modular de 32 bits.

Ao trabalhar com a biblioteca de containers C++, o tipo apropriado para a diferença entre iterators é o typedef de membro difference_type, que é frequentemente sinônimo de `std::ptrdiff_t`.

Apenas ponteiros para elementos do mesmo array (incluindo o ponteiro um após o final do array) podem ser subtraídos um do outro.

Se um array for tão grande (maior que [PTRDIFF_MAX](<#/doc/types/climits>) elementos, mas menor que [SIZE_MAX](<#/doc/types/climits>) bytes), que a diferença entre dois ponteiros pode não ser representável como `std::ptrdiff_t`, o resultado da subtração de dois desses ponteiros é comportamento indefinido.

Para arrays de char menores que [PTRDIFF_MAX](<#/doc/types/climits>), `std::ptrdiff_t` atua como a contraparte com sinal de [std::size_t](<#/doc/types/size_t>): ele pode armazenar o tamanho do array de qualquer tipo e é, na maioria das plataformas, sinônimo de [std::intptr_t](<#/doc/types/integer>).

Não é especificado se a declaração de `std::ptrdiff_t` está disponível em qualquer outro cabeçalho da biblioteca padrão. Uma implementação pode evitar introduzir este nome mesmo quando o padrão exige que `std::ptrdiff_t` seja usado.

### Possível implementação
```cpp
    // válido desde C++11
    using ptrdiff_t = decltype(static_cast<int*>(nullptr) - static_cast<int*>(nullptr));
```

---

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
     
    int main()
    {
        const std::size_t N = 10;
        int* a = new int[N];
        int* end = a + N;
        for (std::ptrdiff_t i = N; i > 0; --i)
            std::cout << (*(end - i) = i) << ' ';
        std::cout << '\n';
        delete[] a;
    }
```

Saída:
```
    10 9 8 7 6 5 4 3 2 1
```

### Veja também

[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)
[ offsetof](<#/doc/types/offsetof>) | offset em bytes do início de um tipo [standard-layout](<#/doc/named_req/StandardLayoutType>) para o membro especificado
(macro de função)
[Documentação C](<#/>) para ptrdiff_t