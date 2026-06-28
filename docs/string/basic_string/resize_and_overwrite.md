# std::basic_string&lt;CharT,Traits,Allocator&gt;::resize_and_overwrite

```cpp
template< class Operation >
constexpr void resize_and_overwrite( size_type count, Operation op );  // (desde C++23)
```

  
Redimensiona a string para conter no máximo `count` caracteres, usando a operação `op` fornecida pelo usuário para modificar o conteúdo possivelmente indeterminado e definir o comprimento. Isso evita o custo de inicializar uma [std::string](<#/doc/string/basic_string>) de tamanho adequado quando ela se destina a ser usada como um array de `char` a ser preenchido por, por exemplo, uma chamada de API C.

Esta função executa os seguintes passos:

  1. Obtém armazenamento contíguo que contém `count + 1` caracteres, e torna seus primeiros `k` caracteres iguais aos primeiros `k` caracteres de `*this`, onde `k` é o menor entre `count` e o resultado de `size()` antes da chamada para `resize_and_overwrite`. Seja `p` o ponteiro para o primeiro caractere no armazenamento.
     * A igualdade é determinada como se verificando `this->compare(0, k, p, k) == 0`.
     * Os caracteres em `[`p + k`, `p + count`]` podem ter valores indeterminados.
  2. Avalia `std::move(op)(p, count)`, seja `r` o valor de retorno.
  3. Substitui o conteúdo de `*this` por `[`p`, `p + r`)` (o que define o comprimento de `*this` para `r`). Invalida todos os ponteiros e referências para o range `[`p`, `p + count`]`.

Se `r` não for de um [tipo inteiro](<#/doc/iterator/is-integer-like>), o programa é malformado.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `std::move(op)(p, count)` lança uma exceção.
  * `std::move(op)(p, count)` modifica `p` ou `count`.
  * `r` não está no range `[`​0​`, `count`]`.
  * Qualquer caractere no range `[`p`, `p + r`)` tem um valor indeterminado.

Recomenda-se que as implementações evitem cópias e alocações desnecessárias, por exemplo, tornando `p` igual ao ponteiro para o início do armazenamento de caracteres alocados para `*this` após a chamada, o que pode ser idêntico ao armazenamento existente de `*this` se `count` for menor ou igual a `capacity()`.

### Parâmetros

count  |  \-  |  o tamanho máximo possível da nova string   
---|---|---
op  |  \-  |  o objeto de função usado para definir o novo conteúdo da string   
  
### Exceções

[std::length_error](<#/doc/error/length_error>) se `count > max_size()`. Quaisquer exceções lançadas pelo `Allocator` correspondente.

Se uma exceção for lançada de `std::move(op)(p, count)`, o comportamento é indefinido. Caso contrário, se uma exceção for lançada, esta função não tem efeito.

### Observações

`resize_and_overwrite` invalida todos os iterators, ponteiros e referências para `*this`, independentemente de ocorrer realocação. As implementações podem assumir que o conteúdo da string não é "aliased" após a chamada para `resize_and_overwrite`.

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_string_resize_and_overwrite`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | `std::basic_string::resize_and_overwrite`  
  
### Exemplo

Link para testar o exemplo: [compiler explorer](<https://godbolt.org/z/fbbeYGf5h>).

Run this code
```
    #include <algorithm>
    #include <cassert>
    #include <cstddef>
    #include <cstring>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <string_view>
    static_assert(__cpp_lib_string_resize_and_overwrite);
     
    constexpr std::string_view fruits[]{"apple", "banana", "coconut", "date", "elderberry"};
     
    int main()
    {
        // A simple case, append only fruits[0]. The string size will be increased.
        std::string s{"Food: "};
        s.resize_and_overwrite(16, sz = s.size() buf_size) noexcept
        {
            const auto to_copy = std::min(buf_size - sz, fruits[0].size());
            std::memcpy(buf + sz, fruits[0].data(), to_copy);
            return sz + to_copy;
        });
        std::cout << "1. " << std::quoted(s) << '\n';
     
        // The size shrinking case. Note, that the user's lambda is always invoked.
        s.resize_and_overwrite(10,  noexcept
        {
            return std::find(buf, buf + n, ':') - buf;
        });
        std::cout << "2. " << std::quoted(s) << '\n';
     
        std::cout << "3. Copy data until the buffer is full. Print data and sizes.\n";
        std::string food{"Food:"};
        const auto resize_to{27};
        std::cout << "Initially, food.size: " << food.size()
                  << ", food.capacity: " << food.capacity()
                  << ", resize_to: " << resize_to
                  << ", food: " << std::quoted(food) << '\n';
     
        food.resize_and_overwrite
        (
            resize_to,
            food_size = food.size() n) noexcept -> std::size_t
            {
                // p[0]..p[n] is the assignable range
                // p[0]..p[min(n, food_size) - 1] is the readable range
                // (contents initially equal to the original string)
     
                // Debug print:
                std::cout << "In Operation(); n: " << n << '\n';
     
                // Copy fruits to the buffer p while there is enough space.
                char* first = p + food_size;
     
                for (char* const end = p + n; const std::string_view fruit : fruits)
                {
                    char* last = first + fruit.size() + 1;
                    if (last > end)
                        break;
                    *first++ = ' ';
                    std::ranges::copy(fruit, first);
                    first = last;
                }
     
                const auto final_size{static_cast<std::size_t>(first - p)};
     
                // Debug print:
                std::cout << "In Operation(); final_size: " << final_size << '\n';
     
                assert(final_size <= n);
                return final_size; // Return value is the actual new length
                                   // of the string, must be in range 0..n
            }
        );
     
        std::cout << "Finally, food.size: " << food.size()
                  << ", food.capacity: " << food.capacity()
                  << ", food: " << std::quoted(food) << '\n';
    }
```

Possible output: 
```
    1. "Food: apple"
    2. "Food"
    3. Copy data until the buffer is full. Print data and sizes.
    Initially, food.size: 5, food.capacity: 15, resize_to: 27, food: "Food:"
    In Operation(); n: 27
    In Operation(); final_size: 26
    Finally, food.size: 26, food.capacity: 30, food: "Food: apple banana coconut"
```

### Ver também

[ resize](<#/doc/string/basic_string/resize>) |  altera o número de caracteres armazenados   
(função membro pública)  