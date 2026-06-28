# std::ios_base::register_callback

```cpp
void register_callback( event_callback function, int index );
```
Registra uma função definida pelo usuário que será chamada por [imbue()](<#/doc/io/ios_base/imbue>), [std::basic_ios::copyfmt()](<#/doc/io/basic_ios/copyfmt>) e ~ios_base(). Cada callback registrado é chamado sempre: o tipo de evento (um valor do tipo [event](<#/doc/io/ios_base/event>)) é passado como seu primeiro argumento, e pode ser usado para distinguir entre os chamadores.

Os callbacks são chamados na ordem inversa de registro (em outras palavras, `register_callback()` empilha um par de callback na pilha de callbacks). Se `register_callback()` for chamado de dentro de uma função de callback para adicionar um novo callback, o novo callback será chamado apenas no próximo evento.

A função de callback definida pelo usuário não tem permissão para lançar exceções.

### Parâmetros

| function | - | a função que será chamada no evento, fornecida como um ponteiro de função do tipo [event_callback](<#/doc/io/ios_base/event_callback>) |
|---|---|---|
| index | - | parâmetro personalizado que será passado para a função |

### Valor de retorno

(nenhum)

### Observações

Uma vez registrado, um callback não pode ser desregistrado: ele permanece parte do objeto stream pelo resto de sua vida útil. Se o comportamento de um callback precisar ser alterado, ele pode ser controlado através de [iword()](<#/doc/io/ios_base/iword>) ou [pword()](<#/doc/io/ios_base/pword>).

Se a mesma função for registrada várias vezes, ela será chamada várias vezes.

O valor inteiro que é armazenado junto com o callback é tipicamente um índice obtido de [xalloc()](<#/doc/io/ios_base/xalloc>).

### Exemplo

Demonstra o uso de `register_callback` para atualizar valores em cache dependentes de locale que são usados por um operador de saída personalizado.

Run this code
```cpp
    #include <functional>
    #include <iostream>
    #include <locale>
    
    // Mensagem específica do locale em cache e seu hash
    typedef std::pair<std::string, std::size_t> cache_t;
    
    // Preenche a mensagem em cache e seu hash a partir do locale
    void update_cache(cache_t& cache, std::locale loc)
    {
        auto& fct = std::use_facet< std::messages<char> >(loc);
        std::messages_base::catalog cat = fct.open("sed", loc);
        cache.first = cat < 0 ? "" : fct.get(cat, 0, 0, "Memory exhausted");
        cache.second = std::hash<std::string>()(cache.first);
    }
    
    // Atualiza o cache se o locale mudou
    void true_callback(std::ios_base::event evt, std::ios_base& str, int idx)
    {
        if (evt == std::ios_base::imbue_event) 
        {
            cache_t* ptr = static_cast<cache_t*>(str.pword(idx));
            update_cache(*ptr, str.getloc());
        }
    }
    
    // Registra o cache em pword() e configura o callback
    struct CacheSetup
    {
        CacheSetup(std::ostream& os, std::ios_base::event_callback f, cache_t* cache)
        {
            int index = std::ostream::xalloc();
            os.pword(index) = cache; // Armazena o ponteiro para o cache no stream
            os.register_callback(f, index); // Armazena o callback e o índice para o ponteiro
            update_cache(*cache, os.getloc()); // Inicializa o cache
        };
    };
    
    // Alguma classe personalizada 
    struct S {};
    // Operador<< de alguma classe personalizada que precisa de acesso rápido à mensagem com hash
    std::ostream& operator<<(std::ostream& os, const S&)
    {
        static cache_t cache;
        static CacheSetup setup(os, true_callback, &cache);
        return os << cache.first << " : " << cache.second;
    }
    
    int main()
    {
        std::locale loc("en_US.utf8");
    
        S s;
        std::cout.imbue(loc);
        std::cout << s << '\n';
    
        std::cout.imbue(std::locale(loc, new std::messages_byname<char>("de_DE.utf8")));
        std::cout << s << '\n';
    
        std::cout.imbue(std::locale(loc, new std::messages_byname<char>("ja_JP.utf8")));
        std::cout << s << '\n';
    
        std::cout.imbue(std::locale(loc, new std::messages_byname<char>("ru_RU.utf8")));
        std::cout << s << '\n';
    }
```

Saída:
```
    Memory exhausted : 2,295,079,096
    Speicher erschöpft : 3,139,423,551
    メモリーが足りません : 3,837,351,114
    Память исчерпана : 3,742,732,851
```