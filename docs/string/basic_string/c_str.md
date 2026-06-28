# std::basic_string&lt;CharT,Traits,Allocator&gt;::c_str

const CharT* c_str() const; |  | (noexcept desde C++11)   
(constexpr desde C++20)  

  
Retorna um ponteiro para um array de caracteres terminado em nulo com dados equivalentes aos armazenados na string.

O ponteiro é tal que o range `[`c_str()`, `c_str() + size()`]` é válido e os valores nele correspondem aos valores armazenados na string com um caractere nulo adicional após a última posição.

O ponteiro obtido de `c_str()` pode ser invalidado por:

  * Passar uma referência não-const à string para qualquer função da standard library, ou
  * Chamar funções membro não-const na string, excluindo [operator[]](<#/doc/string/basic_string/operator_at>), [at()](<#/doc/string/basic_string/at>), [front()](<#/doc/string/basic_string/front>), [back()](<#/doc/string/basic_string/back>), [begin()](<#/doc/string/basic_string/begin>), [rbegin()](<#/doc/string/basic_string/rbegin>), [end()](<#/doc/string/basic_string/end>) e [rend()](<#/doc/string/basic_string/rend>) (desde C++11).

Escrever no array de caracteres acessado através de `c_str()` é comportamento indefinido.

`c_str()` e [data()](<#/doc/string/basic_string/data>) executam a mesma função. | (desde C++11)  
  
### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o armazenamento de caracteres subjacente.

```cpp
c_str()[i] == operator para todo `i` em `[`​0​`, `size()`)`.  // (até C++11)
c_str() + i == std::addressof(operator) para todo `i` em `[`​0​`, `size()`]`.  // (desde C++11)
```
  
### Complexidade

Constante.

### Observações

O ponteiro obtido de `c_str()` só pode ser tratado como um ponteiro para uma string de caracteres terminada em nulo se o objeto string não contiver outros caracteres nulos.

### Exemplo

Run this code
```cpp
    #include <algorithm>
    #include <cassert>
    #include <cstring>
    #include <string>
    
    extern "C" void c_func(const char* c_str)
    {
        printf("c_func called with '%s'\n", c_str);
    }
    
    int main()
    {
        std::string const s("Emplary");
        const char* p = s.c_str();
        assert(s.size() == std::strlen(p));
        assert(std::equal(s.begin(), s.end(), p));
        assert(std::equal(p, p + s.size(), s.begin()));
        assert('\0' == *(p + s.size()));
    
        c_func(s.c_str());
    }
```

Saída:
```
    c_func called with 'Emplary'
```

### Veja também

[ front](<#/doc/string/basic_string/front>)(DR*) | acessa o primeiro caractere   
(função membro pública)  
[ back](<#/doc/string/basic_string/back>)(DR*) | acessa o último caractere   
(função membro pública)  
[ data](<#/doc/string/basic_string/data>) | retorna um ponteiro para o primeiro caractere de uma string   
(função membro pública)