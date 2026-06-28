# std::basic_string&lt;CharT,Traits,Allocator&gt;::data

```cpp
const CharT* data() const; | (1) | (noexcept desde C++11)
(constexpr desde C++20)
CharT* data() noexcept;  // (2) (desde C++17)
(constexpr desde C++20)
```

Retorna um ponteiro para o array subjacente que serve como armazenamento de caracteres. O ponteiro é tal que o range

`[`data()`, `data() + size()`)` | (até C++11)
---|---
`[`data()`, `data() + size()`]` | (desde C++11)

é válido e os valores nele correspondem aos valores armazenados na string.

O array retornado não é necessariamente terminado em nulo. Se [empty()](<#/doc/string/basic_string/empty>) retornar true, o ponteiro é um ponteiro não nulo que não deve ser desreferenciado. | (até C++11)
---|---
O array retornado é terminado em nulo, ou seja, `data()` e [c_str()](<#/doc/string/basic_string/c_str>) executam a mesma função. Se [empty()](<#/doc/string/basic_string/empty>) retornar true, o ponteiro aponta para um único caractere nulo. | (desde C++11)

O ponteiro obtido de `data()` pode ser invalidado por:

*   Passar uma referência não-const para a string para qualquer função da standard library, ou
*   Chamar funções membro não-const na string, excluindo [`operator[]()`](<#/doc/string/basic_string/operator_at>), [at()](<#/doc/string/basic_string/at>), [front()](<#/doc/string/basic_string/front>), [back()](<#/doc/string/basic_string/back>), [begin()](<#/doc/string/basic_string/begin>), [end()](<#/doc/string/basic_string/end>), [rbegin()](<#/doc/string/basic_string/rbegin>), [rend()](<#/doc/string/basic_string/rend>).

1) Modificar o array de caracteres acessado através da sobrecarga const de `data` resulta em comportamento indefinido.

2) Modificar o terminador nulo "past-the-end" armazenado em `data() + `[size()](<#/doc/string/basic_string/size>) para qualquer valor diferente de `CharT()` resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Um ponteiro para o armazenamento de caracteres subjacente.

```cpp
data()[i] == operator para cada `i` em `[`​0​`, `size()`)`.  // (até C++11)
data() + i == std::addressof(operator) para cada `i` em `[`​0​`, `size()`]`.  // (desde C++11)
```

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <cstring>
    #include <string>
     
    int main()
    {
        std::string const s("Emplary");
        assert(s.size() == std::strlen(s.data()));
        assert(std::equal(s.begin(), s.end(), s.data()));
        assert(std::equal(s.data(), s.data() + s.size(), s.begin()));
        assert('\0' == *(s.data() + s.size()));
    }
```

### Veja também

[ front](<#/doc/string/basic_string/front>)(DR*) | acessa o primeiro caractere
(função membro pública)
[ back](<#/doc/string/basic_string/back>)(DR*) | acessa o último caractere
(função membro pública)
[ c_str](<#/doc/string/basic_string/c_str>) | retorna uma versão de array de caracteres C padrão não modificável da string
(função membro pública)
[ data](<#/doc/string/basic_string_view/data>) | retorna um ponteiro para o primeiro caractere de uma view
(função membro pública de `std::basic_string_view<CharT,Traits>`)