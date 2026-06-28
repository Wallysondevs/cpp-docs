# Requisitos nomeados C++: Allocator

Encapsula estratégias para acesso/endereçamento, alocação/desalocação e construção/destruição de objetos.

Todo componente da standard library que possa precisar alocar ou liberar armazenamento, desde [std::string](<#/doc/string/basic_string>), [std::vector](<#/doc/container/vector>), e todo container, exceto [std::array](<#/doc/container/array>)(desde C++11) e std::inplace_vector(desde C++26), até [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::function](<#/doc/utility/functional/function>)(até C++17), o faz através de um **Allocator**: um objeto de um tipo de classe que satisfaz os seguintes requisitos.

A implementação de muitos requisitos de allocator é opcional porque todos os [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>) acessam allocators indiretamente através de [std::allocator_traits](<#/doc/memory/allocator_traits>), e [std::allocator_traits](<#/doc/memory/allocator_traits>) fornece a implementação padrão desses requisitos.

### Requisitos

Dado

  * `T`, um tipo não-const, não-referência (até C++11) tipo de objeto não-const (desde C++11) (até C++17) tipo de objeto cv-não-qualificado (desde C++17),
  * `A`, um tipo Allocator para o tipo `T`,
  * `a`, um objeto do tipo `A`,
  * `B`, o tipo Allocator correspondente para algum tipo de objeto cv-não-qualificado `U` (obtido por rebinding de `A`),
  * `b`, um objeto do tipo `B`,
  * `p`, um valor do tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::pointer, obtido pela chamada de [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::allocate(),
  * `cp`, um valor do tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::const_pointer, obtido por conversão de p,
  * `vp`, um valor do tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::void_pointer, obtido por conversão de p,
  * `cvp`, um valor do tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::const_void_pointer, obtido por conversão de cp ou de vp,
  * `xp`, um ponteiro desreferenciável para algum tipo de objeto cv-não-qualificado `X`,
  * `r`, um lvalue do tipo `T` obtido pela expressão *p,
  * `n`, um valor do tipo [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;A&gt;::size_type.

Tipos internos  ID do Tipo | Tipo Aliado | Requisitos
---|---|---
`A::pointer` (opcional) | _(não especificado)_[1](<#/doc/named_req/Allocator>) |

  * Satisfaz [NullablePointer](<#/doc/named_req/NullablePointer>), [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>).

`A::const_pointer` (opcional) | _(não especificado)_ |

  * Satisfaz [NullablePointer](<#/doc/named_req/NullablePointer>), [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>).
  * `A::pointer` é conversível para `A::const_pointer`.

`A::void_pointer` (opcional) | _(não especificado)_ |

  * Satisfaz [NullablePointer](<#/doc/named_req/NullablePointer>).
  * `A::pointer` é conversível para `A::void_pointer`.
  * `B::void_pointer` e `A::void_pointer` são do mesmo tipo.

`A::const_void_pointer` (opcional) | _(não especificado)_ |

  * Satisfaz [NullablePointer](<#/doc/named_req/NullablePointer>).
  * `A::pointer`, `A::const_pointer` e `A::void_pointer` são conversíveis para `A::const_void_pointer`.
  * `B::const_void_pointer` e `A::const_void_pointer` são do mesmo tipo.

`A::value_type` | `T` |
---|---|---
`A::size_type` (opcional) | _(não especificado)_ |

  * Um tipo inteiro sem sinal.
  * Pode representar o tamanho do maior objeto que `A` pode alocar.

`A::difference_type` (opcional) | _(não especificado)_ |

  * Um tipo inteiro com sinal.
  * Pode representar a diferença de quaisquer dois ponteiros para os objetos alocados por `A`.

`A::template rebind<U>::other`
(opcional)[2](<#/doc/named_req/Allocator>) | `B` |

  * Para qualquer `U`, `B::template rebind<T>::other` é `A`.

Operações em ponteiros  Expressão | Tipo de retorno | Requisitos
---|---|---
*p | `T&` |
*cp | const T& | *cp e *p identificam o mesmo objeto.
p->m | _(como está)_ | O mesmo que (*p).m, se (*p).m for bem definido.
cp->m | _(como está)_ | O mesmo que (*cp).m, se (*cp).m for bem definido.
static_cast<A::pointer>(vp) | _(como está)_ | static_cast<A::pointer>(vp) == p
static_cast<A::const_pointer>(cvp) | _(como está)_ | static_cast<A::const_pointer>(cvp) == cp
[std::pointer_traits](<#/doc/memory/pointer_traits>)<A::pointer>::pointer_to(r) | _(como está)_ |
Operações de armazenamento e tempo de vida  Expressão | Tipo de retorno | Requisitos
a.allocate(n) | `A::pointer` | Aloca armazenamento adequado para um objeto array do tipo `T[n]` e cria o array, mas não constrói os elementos do array. Pode lançar exceções. Se n == 0, o valor de retorno é não especificado.
a.allocate(n, cvp) (opcional) | O mesmo que a.allocate(n), mas pode usar cvp (nullptr ou um ponteiro obtido de a.allocate()) de maneira não especificada para auxiliar a localidade.
a.allocate_at_least(n) (opcional) (desde C++23) | [std::allocation_result](<#/doc/memory/allocation_result>)
<A::pointer> | Aloca armazenamento adequado para um objeto array do tipo `T[cnt]` e cria o array, mas não constrói os elementos do array, então retorna {p, cnt}, onde p aponta para o armazenamento e cnt não é menor que n. Pode lançar exceções.
a.deallocate(p, n) | _(não usado)_ | Desaloca o armazenamento apontado por p, que deve ser um valor retornado por uma chamada anterior a `allocate` ou `allocate_at_least`(desde C++23) que não tenha sido invalidado por uma chamada intermediária a `deallocate`. n deve corresponder ao valor passado anteriormente para `allocate` ou estar entre o número de elementos solicitado e retornado via `allocate_at_least` (pode ser igual a qualquer um dos limites)(desde C++23). Não lança exceções.
a.max_size() (opcional) | `A::size_type` | O maior valor que pode ser passado para A::allocate().
a.construct(xp, args...) (opcional) | _(não usado)_ | Constrói um objeto do tipo `X` em armazenamento previamente alocado no endereço apontado por xp, usando args... como argumentos do construtor.
a.destroy(xp) (opcional) | _(não usado)_ | Destrói um objeto do tipo `X` apontado por xp, mas não desaloca nenhum armazenamento.
Relação entre instâncias  Expressão | Tipo de retorno | Requisitos
a1 == a2 | bool |

  * true somente se o armazenamento alocado pelo allocator a1 puder ser desalocado através de a2.
  * Estabelece uma relação reflexiva, simétrica e transitiva.
  * Não lança exceções.

a1 != a2 |

  * O mesmo que !(a1 == a2).

Declaração | Efeito | Requisitos
---|---
A a1(a) | Constrói a1 por cópia de modo que a1 == a.
(Nota: Todo Allocator também satisfaz [CopyConstructible](<#/doc/named_req/CopyConstructible>).) |

  * Não lança exceções.

A a1 = a
A a(b) | Constrói a de modo que B(a) == b e A(b) == a.
---|---
(Nota: Isso implica que todos os allocators relacionados por `rebind` mantêm os recursos uns dos outros, como pools de memória.) |

  * Não lança exceções.

A a1(std::move(a)) | Constrói a1 de modo que seja igual ao valor anterior de a. |

  * Não lança exceções.
  * O valor de a permanece inalterado e a1 == a.

A a1 = std::move(a)
A a(std::move(b)) | Constrói a de modo que seja igual ao valor anterior de A(b). |

  * Não lança exceções.

ID do Tipo | Tipo Aliado | Requisitos
`A::is_always_equal`
(opcional) | [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>) ou derivado de tal. |

  * true se quaisquer dois allocators do tipo `A` sempre compararem como iguais.
  * (Se não fornecido, [std::allocator_traits](<#/doc/memory/allocator_traits>) define o padrão para [std::is_empty](<#/doc/types/is_empty>)&lt;A&gt;::type.)

Influência nas operações de container  Expressão | Tipo de retorno | Descrição
a.select_on_container_copy_construction()
(opcional) | `A` |

  * Fornece uma instância de `A` a ser usada pelo container que é construído por cópia a partir daquele que usa a atualmente.
  * (Geralmente retorna uma cópia de a ou um `A` construído por padrão.)

ID do Tipo | Tipo Aliado | Descrição
`A::propagate_on_container_copy_assignment`
(opcional) | [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>) ou derivado de tal. |

  * [std::true_type](<#/doc/types/integral_constant>) ou derivado dele se o allocator do tipo `A` precisar ser copiado quando o container que o usa for atribuído por cópia.
  * Se este membro for [std::true_type](<#/doc/types/integral_constant>) ou derivado dele, então `A` deve satisfazer [CopyAssignable](<#/doc/named_req/CopyAssignable>) e a operação de cópia não deve lançar exceções.
  * Note que se os allocators dos containers de origem e destino não compararem como iguais, a atribuição por cópia deve desalocar a memória do destino usando o allocator antigo e então alocá-la usando o novo allocator antes de copiar os elementos (e o allocator).

`A::propagate_on_container_move_assignment`
(opcional) |

  * [std::true_type](<#/doc/types/integral_constant>) ou derivado dele se o allocator do tipo `A` precisar ser movido quando o container que o usa for atribuído por movimento.
  * Se este membro for [std::true_type](<#/doc/types/integral_constant>) ou derivado dele, então `A` deve satisfazer [MoveAssignable](<#/doc/named_req/MoveAssignable>) e a operação de movimento não deve lançar exceções.
  * Se este membro não for fornecido ou for derivado de [std::false_type](<#/doc/types/integral_constant>) e os allocators dos containers de origem e destino não compararem como iguais, a atribuição por movimento não pode assumir a propriedade da memória de origem e deve atribuir por movimento ou construir por movimento os elementos individualmente, redimensionando sua própria memória conforme necessário.

`A::propagate_on_container_swap`
(opcional) |

  * [std::true_type](<#/doc/types/integral_constant>) ou derivado dele se os allocators do tipo `A` precisarem ser trocados quando dois containers que os usam forem trocados.
  * Se este membro for [std::true_type](<#/doc/types/integral_constant>) ou derivado dele, o tipo `A` deve satisfazer [Swappable](<#/doc/named_req/Swappable>) e a operação de troca não deve lançar exceções.
  * Se este membro não for fornecido ou for derivado de [std::false_type](<#/doc/types/integral_constant>) e os allocators dos dois containers não compararem como iguais, o comportamento da troca de container é indefinido.

Notas:

  1. [↑](<#/doc/named_req/Allocator>) Veja também [fancy pointers](<#/doc/named_req/Allocator>) abaixo.
  2. [↑](<#/doc/named_req/Allocator>) `rebind` é opcional (fornecido por [std::allocator_traits](<#/doc/memory/allocator_traits>)) somente se este allocator for um template da forma `SomeAllocator<T, Args>`, onde `Args` são zero ou mais parâmetros de tipo template adicionais.

Dado

  * x1 e x2, objetos de tipos (possivelmente diferentes) `X::void_pointer`, `X::const_void_pointer`, `X::pointer`, ou `X::const_pointer`

    Então, x1 e x2 são valores de ponteiro _com valores equivalentes_, se e somente se ambos x1 e x2 puderem ser explicitamente convertidos para os dois objetos correspondentes px1 e px2 do tipo `X::const_pointer`, usando uma sequência de static_casts utilizando apenas esses quatro tipos, e a expressão px1 == px2 for avaliada como true.

Dado

  * w1 e w2, objetos do tipo `X::void_pointer`

    Então, para as expressões w1 == w2 e w1 != w2, um ou ambos os objetos podem ser substituídos por um objeto _com valor equivalente_ do tipo `X::const_void_pointer` sem alteração na semântica.

Dado

  * p1 e p2, objetos do tipo `X::pointer`

    Então, para as expressões p1 == p2, p1 != p2, p1 < p2, p1 <= p2, p1 >= p2, p1 > p2, p1 - p2, um ou ambos os objetos podem ser substituídos por um objeto _com valor equivalente_ do tipo `X::const_pointer` sem alteração na semântica.

Os requisitos acima tornam possível comparar os `iterator`s e `const_iterator`s de [Container](<#/doc/named_req/Container>).

#### Requisitos de completude do Allocator

Um tipo de allocator `X` para o tipo `T` adicionalmente satisfaz os _requisitos de completude do allocator_ se ambos os seguintes forem verdadeiros, independentemente de `T` ser um tipo completo:

  * `X` é um tipo completo.
  * Exceto por `value_type`, todos os tipos membros de [std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;X&gt; são tipos completos.

| (desde C++17)

### Allocators com estado e sem estado

Todo tipo Allocator é _com estado_ (stateful) ou _sem estado_ (stateless). Geralmente, um tipo de allocator com estado pode ter valores desiguais que denotam recursos de memória distintos, enquanto um tipo de allocator sem estado denota um único recurso de memória.

Embora allocators personalizados não sejam obrigados a ser sem estado, se e como o uso de allocators com estado na standard library é definido pela implementação. O uso de valores de allocator desiguais pode resultar em erros de tempo de execução definidos pela implementação ou comportamento indefinido se a implementação não suportar tal uso. | (até C++11)
---|---
Allocators personalizados podem conter estado. Cada container ou outro objeto ciente de allocator armazena uma instância do allocator fornecido e controla a substituição do allocator através de [std::allocator_traits](<#/doc/memory/allocator_traits>). | (desde C++11)

Instâncias de um tipo de allocator sem estado sempre comparam como iguais. Tipos de allocator sem estado são tipicamente implementados como classes vazias e são adequados para [otimização de classe base vazia](<#/doc/language/ebo>).

O tipo membro `is_always_equal` de [std::allocator_traits](<#/doc/memory/allocator_traits>) é intencionalmente usado para determinar se um tipo de allocator é sem estado. | (desde C++11)

### Ponteiros "Fancy"

Quando o tipo membro `pointer` não é um tipo de ponteiro bruto (raw pointer), ele é comumente referido como um ["fancy pointer"](<https://wg21.link/P0773R0>). Tais ponteiros foram introduzidos para suportar arquiteturas de memória segmentada e são usados hoje para acessar objetos alocados em espaços de endereço que diferem do espaço de endereço virtual homogêneo que é acessado por ponteiros brutos. Um exemplo de fancy pointer é o ponteiro independente de endereço [`boost::interprocess::offset_ptr`](<https://www.boost.org/doc/libs/release/doc/html/interprocess/offset_ptr.html>), que torna possível alocar estruturas de dados baseadas em nós, como [std::set](<#/doc/container/set>), em memória compartilhada e arquivos mapeados em memória mapeados em diferentes endereços em cada processo. Fancy pointers podem ser usados independentemente do allocator que os forneceu, através do class template [std::pointer_traits](<#/doc/memory/pointer_traits>)(desde C++11). A função std::to_address pode ser usada para obter um ponteiro bruto de um fancy pointer. (desde C++20)

O uso de fancy pointers e tipos de tamanho/diferença personalizados na standard library é condicionalmente suportado. As implementações podem exigir que os tipos membros `pointer`, `const_pointer`, `size_type` e `difference_type` sejam `value_type*`, `const value_type*`, [std::size_t](<#/doc/types/size_t>) e [std::ptrdiff_t](<#/doc/types/ptrdiff_t>), respectivamente. | (até C++11)

### Conceito

Para a definição do objeto de consulta std::get_allocator, o seguinte conceito apenas para exposição é definido. | template&lt;class Alloc&gt;
concept /*simple-allocator*/ = requires(Alloc alloc, [std::size_t](<#/doc/types/size_t>) n)
{
{ *alloc.allocate(n) } -> [std::same_as](<#/doc/concepts/same_as>)&lt;typename Alloc::value_type&&gt;;
{ alloc.deallocate(alloc.allocate(n), n) };
} && [std::copy_constructible](<#/doc/concepts/copy_constructible>)&lt;Alloc&gt;
&& [std::equality_comparable](<#/doc/concepts/equality_comparable>)&lt;Alloc&gt;;

O conceito apenas para exposição /*simple-allocator*/ define as restrições mínimas de usabilidade do requisito **Allocator**.

(desde C++26)

### Standard library

Os seguintes componentes da standard library satisfazem os requisitos de Allocator:

[ allocator](<#/doc/memory/allocator>) | o allocator padrão
(class template)
[ scoped_allocator_adaptor](<#/doc/memory/scoped_allocator_adaptor>)(C++11) | implementa allocator multi-nível para containers multi-nível
(class template)
[ polymorphic_allocator](<#/doc/memory/polymorphic_allocator>)(C++17) | um allocator que suporta polimorfismo em tempo de execução baseado no [std::pmr::memory_resource](<#/doc/memory/memory_resource>) com o qual é construído
(class template)

### Exemplos

Demonstra um allocator C++11, exceto por `[[[nodiscard](<#/doc/language/attributes/nodiscard>)]]` adicionado para corresponder ao estilo C++20.

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
    #include <limits>
    #include <new>
    #include <vector>
    
    template<class T>
    struct Mallocator
    {
        typedef T value_type;
    
        Mallocator() = default;
    
        template<class U>
        constexpr Mallocator(const Mallocator <U>&) noexcept {}
    
        [[nodiscard]] T* allocate(std::size_t n)
        {
            if (n > std::numeric_limits<std::size_t>::max() / sizeof(T))
                throw std::bad_array_new_length();
    
            if (auto p = static_cast<T*>(std::malloc(n * sizeof(T))))
            {
                report(p, n);
                return p;
            }
    
            throw std::bad_alloc();
        }
    
        void deallocate(T* p, std::size_t n) noexcept
        {
            report(p, n, 0);
            std::free(p);
        }
    private:
        void report(T* p, std::size_t n, bool alloc = true) const
        {
            std::cout << (alloc ? "Alloc: " : "Dealloc: ") << sizeof(T) * n
                      << " bytes at " << std::hex << std::showbase
                      << reinterpret_cast<void*>(p) << std::dec << '\n';
        }
    };
    
    template<class T, class U>
    bool operator==(const Mallocator <T>&, const Mallocator <U>&) { return true; }
    
    template<class T, class U>
    bool operator!=(const Mallocator <T>&, const Mallocator <U>&) { return false; }
    
    int main()
    {
        std::vector<int, Mallocator<int>> v(8);
        v.push_back(42);
    }
```

Saída possível:
```
    Alloc: 32 bytes at 0x2020c20
    Alloc: 64 bytes at 0x2023c60
    Dealloc: 32 bytes at 0x2020c20
    Dealloc: 64 bytes at 0x2023c60
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 179](<https://cplusplus.github.io/LWG/issue179>) | C++98 | `pointer` e `const_pointer` não eram exigidos para serem comparáveis entre si | exigido
[LWG 199](<https://cplusplus.github.io/LWG/issue199>) | C++98 | o valor de retorno de a.allocate(0) era incerto | é não especificado
[LWG 258](<https://cplusplus.github.io/LWG/issue258>)
([N2436](<https://wg21.link/N2436>)) | C++98 | a relação de igualdade entre allocators não era exigida para ser reflexiva, simétrica ou transitiva | exigida para ser reflexiva, simétrica e transitiva
---|---|---|---
[LWG 274](<https://cplusplus.github.io/LWG/issue274>) | C++98 | `T` poderia ser um tipo qualificado como const ou tipo de referência, tornando [std::allocator](<#/doc/memory/allocator>) possivelmente malformado[1](<#/doc/named_req/Allocator>) | proibiu esses tipos
[LWG 2016](<https://cplusplus.github.io/LWG/issue2016>) | C++11 | as operações de cópia, movimento e troca de allocator poderiam lançar exceções quando usadas | exigidas para não lançar exceções
[LWG 2081](<https://cplusplus.github.io/LWG/issue2081>) | C++98
C++11 | allocators não eram exigidos para suportar atribuição por cópia (C++98) e atribuição por movimento (C++11) | exigido
[LWG 2108](<https://cplusplus.github.io/LWG/issue2108>) | C++11 | não havia como indicar que um allocator é sem estado | `is_always_equal` fornecido
[LWG 2263](<https://cplusplus.github.io/LWG/issue2263>) | C++11 | a resolução do [LWG issue 179](<https://cplusplus.github.io/LWG/issue179>) foi acidentalmente removida no C++11
e não generalizada para `void_pointer` e `const_void_pointer` | restaurada e generalizada
[LWG 2447](<https://cplusplus.github.io/LWG/issue2447>) | C++11 | `T` poderia ser um tipo de objeto qualificado como volatile | proibiu esses tipos
[LWG 2593](<https://cplusplus.github.io/LWG/issue2593>) | C++11 | mover de um allocator poderia modificar seu valor | modificação proibida
[P0593R6](<https://wg21.link/P0593R6>) | C++98 | `allocate` não era exigido para criar um
objeto array no armazenamento que alocava | exigido

  1. [↑](<#/doc/named_req/Allocator>) Os tipos membros `reference` e `const_reference` de [std::allocator](<#/doc/memory/allocator>) são definidos como `T&` e `const T&` respectivamente.
     * Se `T` for um tipo de referência, `reference` e `const_reference` são malformados porque referência para referência não pode ser formada ([reference collapsing](<#/doc/language/reference>) foi introduzido no C++11).
     * Se `T` for qualificado como const, `reference` e `const_reference` são os mesmos, e o conjunto de sobrecargas de [`address()`](<#/doc/memory/allocator/address>) é malformado.

*[_(como está)_]: A::pointer