# std::realloc

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void* realloc( void* ptr, std::size_t new_size );
```

Realoca a área de memória fornecida ([criando implicitamente](<#/doc/language/objects>) objetos na área de destino). Ela deve ter sido previamente alocada por [std::malloc](<#/doc/memory/c/malloc>), [std::calloc](<#/doc/memory/c/calloc>) ou `std::realloc` e ainda não ter sido liberada com [std::free](<#/doc/memory/c/free>); caso contrário, o comportamento é indefinido.

A realocação é feita por uma das seguintes formas:

a) expandindo ou contraindo a área existente apontada por ptr, se possível. O conteúdo da área permanece inalterado até o menor dos tamanhos novo e antigo. Se a área for expandida, o conteúdo da nova parte do array é comportamento indefinido.

b) alocando um novo bloco de memória de tamanho new_size bytes, copiando a área de memória com tamanho igual ao menor dos tamanhos novo e antigo, e liberando o bloco antigo.

Se não houver memória suficiente, o bloco de memória antigo não é liberado e um ponteiro nulo é retornado.

Se ptr for um ponteiro nulo, o comportamento é o mesmo que chamar [std::malloc](<#/doc/memory/c/malloc>)(new_size).

Se new_size for zero, o comportamento é definido pela implementação: um ponteiro nulo pode ser retornado (caso em que o bloco de memória antigo pode ou não ser liberado) ou algum ponteiro não nulo pode ser retornado que não pode ser usado para acessar armazenamento. Tal uso é obsoleto (via [C DR 400](<https://open-std.org/JTC1/SC22/WG14/www/docs/n2396.htm#dr_400>)).(desde C++20)

As seguintes funções são exigidas como thread-safe:

  * As versões da biblioteca de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>)
  * Versões de substituição do usuário de [`operator new`](<#/doc/memory/new/operator_new>) e [`operator delete`](<#/doc/memory/new/operator_delete>) globais
  * [std::calloc](<#/doc/memory/c/calloc>), [std::malloc](<#/doc/memory/c/malloc>), **std::realloc** , [std::aligned_alloc](<#/doc/memory/c/aligned_alloc>)(desde C++17), [std::free](<#/doc/memory/c/free>)

Chamadas a essas funções que alocam ou desalocam uma unidade particular de armazenamento ocorrem em uma única ordem total, e cada chamada de desalocação [happens-before](<#/doc/atomic/memory_order>) a próxima alocação (se houver) nesta ordem. | (desde C++11)

### Parâmetros

- **ptr** — ponteiro para a área de memória a ser realocada
- **new_size** — novo tamanho do array

### Valor de retorno

Em caso de sucesso, retorna um ponteiro para o início da memória recém-alocada. Para evitar um vazamento de memória, o ponteiro retornado deve ser desalocado com [std::free](<#/doc/memory/c/free>) ou `std::realloc`. O ponteiro original ptr é invalidado e qualquer acesso a ele é [comportamento indefinido](<#/doc/language/ub>) (mesmo que a realocação tenha sido no local).

Em caso de falha, retorna um ponteiro nulo. O ponteiro original ptr permanece válido e pode precisar ser desalocado com [std::free](<#/doc/memory/c/free>).

### Notas

Como a realocação pode envolver cópia byte a byte (independentemente de expandir ou contrair a área), é necessário (mas não suficiente) que esses objetos sejam do tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

Algumas bibliotecas não padrão definem um type trait "BitwiseMovable" ou "Relocatable", que descreve um tipo que não possui:

  * referências externas (por exemplo, nós de uma lista ou uma árvore que mantém referência a outro elemento), e
  * referências internas (por exemplo, ponteiro membro que pode conter o endereço de outro membro).

Objetos de tal tipo podem ser acessados após seu armazenamento ser realocado, mesmo que seus construtores de cópia não sejam triviais.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstdlib>
    #include <new>
    
    class MallocDynamicBuffer
    {
        char* p;
    public:
        explicit MallocDynamicBuffer(std::size_t initial = 0) : p(nullptr)
        {
            resize(initial);
        }
    
        ~MallocDynamicBuffer() { std::free(p); }
    
        void resize(std::size_t newSize)
        {
            if (newSize == 0) // esta verificação não é estritamente necessária,
            {
                std::free(p); // mas realloc de tamanho zero é obsoleto em C
                p = nullptr;
            }
            else
            {
                if (void* mem = std::realloc(p, newSize))
                    p = static_cast<char*>(mem);
                else
                    throw std::bad_alloc();
            }
        }
    
        char& operator { return p[n]; }
        char operator const { return p[n]; }
    };
    
    int main()
    {
        MallocDynamicBuffer buf1(1024);
        buf1[5] = 'f';
        buf1.resize(10); // encolher
        assert(buf1[5] == 'f');
        buf1.resize(1024); // crescer
        assert(buf1[5] == 'f');
    }
```

### Veja também

[documentação C](<#/>) para realloc
---