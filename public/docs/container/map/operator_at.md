# std::map&lt;Key,T,Compare,Allocator&gt;::operator[]

```cpp
T& operator;  // (1)
T& operator;  // (2) (desde C++11)
template< class K >
T& operator;  // (3) (desde C++26)
```

Retorna uma referência para o valor que é mapeado para uma chave equivalente a key ou x, respectivamente, realizando uma inserção se tal chave ainda não existir.

1) Insere value_type(key, T()) se a chave não existir. | -`key_type` deve atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).
---
-`mapped_type` deve atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).
Se uma inserção for realizada, o valor mapeado é [value-initialized](<#/doc/language/value_initialization>) (construído por padrão para tipos de classe, zero-inicializado caso contrário) e uma referência a ele é retornada.

(até C++11)
1) Insere um objeto [`value_type`](<#/doc/container/map>) construído in-place a partir de [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(key), [std::tuple](<#/doc/utility/tuple>)<>() se a chave não existir. Equivalente a return this->try_emplace(key).first->second;.(desde C++17)Quando o alocador padrão é usado, isso resulta na chave sendo copy constructed de `key` e o valor mapeado sendo [value-initialized](<#/doc/language/value_initialization>). | -`value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) a partir de [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(key), [std::tuple](<#/doc/utility/tuple>)<>(). Quando o alocador padrão é usado, isso significa que [`key_type`](<#/doc/container/map>) deve ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) e `mapped_type` deve ser [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).
---

2) Insere um objeto [`value_type`](<#/doc/container/map>) construído in-place a partir de [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(std::move(key)), [std::tuple](<#/doc/utility/tuple>)<>() se a chave não existir.

Equivalente a return this->try_emplace(std::move(key)).first->second;.(desde C++17)
Quando o alocador padrão é usado, isso resulta na chave sendo move constructed de `key` e o valor mapeado sendo [value-initialized](<#/doc/language/value_initialization>). -`value_type` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) a partir de [std::piecewise_construct](<#/doc/utility/piecewise_construct_t>), [std::forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(std::move(key)), [std::tuple](<#/doc/utility/tuple>)<>(). Quando o alocador padrão é usado, isso significa que [`key_type`](<#/doc/container/map>) deve ser [MoveConstructible](<#/doc/named_req/MoveConstructible>) e `mapped_type` deve ser [DefaultConstructible](<#/doc/named_req/DefaultConstructible>).
---

(desde C++11)

3) Insere um objeto [`value_type`](<#/doc/container/map>) construído in-place se não houver nenhuma chave que compare transparentemente _equivalente_ ao valor x.

Equivalente a return this->try_emplace([std::forward](<#/doc/utility/forward>)&lt;K&gt;(x)).first->second;. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

Nenhum iterator ou referência é invalidado.

### Parâmetros

- **key** — a chave do elemento a ser encontrado
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

1,2) Uma referência para o valor mapeado do novo elemento se nenhum elemento com a chave key existia. Caso contrário, uma referência para o valor mapeado do elemento existente cuja chave é equivalente a key.

3) Uma referência para o valor mapeado do novo elemento se nenhum elemento com chave que compare equivalente ao valor x existia. Caso contrário, uma referência para o valor mapeado do elemento existente cuja chave compara equivalente a x.

### Exceções

Se uma exceção for lançada por qualquer operação, a inserção não terá efeito.

### Complexidade

Logarítmica no tamanho do container.

### Observações

Nos padrões C++11 e C++14 publicados, esta função foi especificada para exigir que `mapped_type` fosse [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) e [`key_type`](<#/doc/container/map>) fosse [CopyInsertable](<#/doc/named_req/CopyInsertable>) ou [MoveInsertable](<#/doc/named_req/MoveInsertable>) em *this. Esta especificação era defeituosa e foi corrigida pelo [LWG issue 2469](<https://cplusplus.github.io/LWG/issue2469>), e a descrição acima incorpora a resolução desse problema.

No entanto, uma implementação (libc++) é conhecida por construir os objetos [`key_type`](<#/doc/container/map>) e `mapped_type` através de duas chamadas separadas de `construct()` do alocador, como supostamente exigido pelos padrões publicados, em vez de emplacing um objeto [`value_type`](<#/doc/container/map>).

operator[] não é const porque ele insere a chave se ela não existir. Se este comportamento for indesejável ou se o container for const, [`at`](<#/doc/container/map/at>) pode ser usado.

```cpp
`insert_or_assign` retorna mais informações do que operator[] e não exige a construtibilidade padrão do tipo mapeado.  // (desde C++17)
Macro de teste de recurso | Valor | Padrão | Recurso
`__cpp_lib_associative_heterogeneous_insertion` | `202311L` | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em containers associativos ordenados e não ordenados. (3)
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <map>
    
    void println(auto const comment, auto const& map)
    {
        std::cout << comment << '{';
        for (const auto& pair : map)
            std::cout << '{' << pair.first << ": " << pair.second << '}';
        std::cout << "}\n";
    }
    
    int main()
    {
        std::map<char, int> letter_counts{{'a', 27}, {'b', 3}, {'c', 1}};
    
        println("letter_counts initially contains: ", letter_counts);
    
        letter_counts['b'] = 42; // updates an existing value
        letter_counts['x'] = 9;  // inserts a new value
    
        println("after modifications it contains: ", letter_counts);
    
        // count the number of occurrences of each word
        // (the first call to operator[] initialized the counter with zero)
        std::map<std::string, int>  word_map;
        for (const auto& w : {"this", "sentence", "is", "not", "a", "sentence",
                              "this", "sentence", "is", "a", "hoax"})
            ++word_map[w];
        word_map["that"]; // just inserts the pair {"that", 0}
    
        for (const auto& [word, count] : word_map)
            std::cout << count << " occurrence(s) of word '" << word << "'\n";
    }
```

Saída:
```
    letter_counts initially contains: {{a: 27}{b: 3}{c: 1}}
    after modifications it contains: {{a: 27}{b: 42}{c: 1}{x: 9}}
    2 occurrence(s) of word 'a'
    1 occurrence(s) of word 'hoax'
    2 occurrence(s) of word 'is'
    1 occurrence(s) of word 'not'
    3 occurrence(s) of word 'sentence'
    0 occurrence(s) of word 'that'
    2 occurrence(s) of word 'this'
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 334](<https://cplusplus.github.io/LWG/issue334>) | C++98 | o efeito da sobrecarga (1) era simplesmente retornar ((*((insert([std::make_pair](<#/doc/utility/pair/make_pair>)(x, T()))).first)).second | forneceu sua própria descrição em vez disso

### Veja também

[ at](<#/doc/container/map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ insert_or_assign](<#/doc/container/map/insert_or_assign>)(C++17) | insere um elemento ou atribui ao elemento atual se a chave já existir
(função membro pública)
[ try_emplace](<#/doc/container/map/try_emplace>)(C++17) | insere in-place se a chave não existir, não faz nada se a chave existir
(função membro pública)