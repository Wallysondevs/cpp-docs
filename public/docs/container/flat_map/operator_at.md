# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::operator[]

```cpp
T& operator;  // (1) (desde C++23)
T& operator;  // (2) (desde C++23)
template< class K >
T& operator;  // (3) (desde C++23)
```

Retorna uma referência para o valor que está mapeado para uma chave equivalente a `key` ou `x` respectivamente, realizando uma inserção se tal chave ainda não existir.

1) Insere um objeto [`value_type`](<#/doc/container/flat_map>) construído no local se a chave não existir. Equivalente a `return try_emplace(x).first->second;`.

2) Insere um objeto [`value_type`](<#/doc/container/flat_map>) construído no local se a chave não existir. Equivalente a `return try_emplace(std::move(x)).first->second;`

3) Insere um objeto [`value_type`](<#/doc/container/flat_map>) construído no local se não houver uma chave que compare transparentemente _equivalente_ ao valor `x`.

Equivalente a `return this->try_emplace([std::forward](<#/doc/utility/forward>)<K>(x)).first->second;`. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id `Compare::is_transparent` for válido e denotar um tipo. Ela permite chamar esta função sem construir uma instância de `Key`.

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")

### Parâmetros

- **key** — a chave do elemento a ser encontrado
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave

### Valor de retorno

1,2) Uma referência para o valor mapeado do novo elemento se nenhum elemento com a chave `key` existia. Caso contrário, uma referência para o valor mapeado do elemento existente cuja chave é equivalente a `key`.

3) Uma referência para o valor mapeado do novo elemento se nenhum elemento com chave que compare equivalente ao valor `x` existia. Caso contrário, uma referência para o valor mapeado do elemento existente cuja chave compara equivalente a `x`.

### Exceções

Se uma exceção for lançada por qualquer operação, a inserção não terá efeito.

### Complexidade

Logarítmica no tamanho do container, mais o custo de [inserção](<#/doc/container/flat_map/try_emplace>) (se houver) de um elemento vazio.

### Observações

`operator[]` não é `const` porque ele insere a chave se ela não existir. Se este comportamento for indesejável ou se o container for `const`, [`at`](<#/doc/container/flat_map/at>) pode ser usado.

[`insert_or_assign`](<#/doc/container/flat_map/insert_or_assign>) retorna mais informações que `operator[]` e não requer a construtibilidade padrão do tipo mapeado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <flat_map>
    
    void println(auto const comment, auto const& map)
    {
        std::cout << comment << '{';
        for (const auto& pair : map)
            std::cout << '{' << pair.first << ": " << pair.second << '}';
        std::cout << "}\n";
    }
    
    int main()
    {
        std::flat_map<char, int> letter_counts{{'a', 27}, {'b', 3}, {'c', 1}};
    
        println("letter_counts initially contains: ", letter_counts);
    
        letter_counts['b'] = 42; // updates an existing value
        letter_counts['x'] = 9;  // inserts a new value
    
        println("after modifications it contains: ", letter_counts);
    
        // count the number of occurrences of each word
        // (the first call to operator[] initialized the counter with zero)
        std::flat_map<std::string, int>  word_map;
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

### Ver também

[ at](<#/doc/container/flat_map/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ insert_or_assign](<#/doc/container/flat_map/insert_or_assign>) | insere um elemento ou atribui ao elemento atual se a chave já existe
(função membro pública)
[ try_emplace](<#/doc/container/flat_map/try_emplace>) | insere no local se a chave não existe, não faz nada se a chave existe
(função membro pública)