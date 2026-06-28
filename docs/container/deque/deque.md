```cpp
# std::deque<T,Allocator>::deque

deque() : deque(Allocator()) {} |  (1)  |  (desde C++11)  
---|---|---  
| (2) |   
explicit deque( const Allocator& alloc = Allocator() ); |  |  (até C++11)  
explicit deque( const Allocator& alloc ); |  |  (desde C++11)  
explicit deque( size_type count, const Allocator& alloc = Allocator() ); |  (3)  |  (desde C++11)  
| (4) |   
explicit deque( size_type count, const T& value = T(),  
const Allocator& alloc = Allocator() ); |  |  (até C++11)  
deque( size_type count, const T& value,  
const Allocator& alloc = Allocator() ); |  |  (desde C++11)  
template< class InputIt >  
deque( InputIt first, InputIt last, const Allocator& alloc = Allocator() ); |  (5)  |   
template< container-compatible-range<T> R >  
deque( std::from_range_t, R&& rg, const Allocator& alloc = Allocator() ); |  (6)  |  (desde C++23)  
deque( const deque& other ); |  (7)  |   
deque( deque&& other ); |  (8)  |  (desde C++11)  
| (9) |   
deque( const deque& other, const Allocator& alloc ); |  |  (desde C++11)   
(até C++23)  
deque( const deque& other, const std::type_identity_t<Allocator>& alloc ); |  |  (desde C++23)  
| (10) |   
deque( deque&& other, const Allocator& alloc ); |  |  (desde C++11)   
(até C++23)  
deque( deque&& other, const std::type_identity_t<Allocator>& alloc ); |  |  (desde C++23)  
deque( std::initializer_list<T> init, const Allocator& alloc = Allocator() ); |  (11)  |  (desde C++11)  
| |   
  
Constrói um novo `deque` a partir de uma variedade de fontes de dados, opcionalmente usando um allocator `alloc` fornecido pelo usuário.

1) O construtor padrão desde C++11. Constrói um `deque` vazio com um allocator construído por padrão.

Se `Allocator` não for DefaultConstructible, o comportamento é indefinido.

2) O construtor padrão até C++11. Constrói um `deque` vazio com o allocator `alloc` fornecido.

3) Constrói um `deque` com `count` objetos de `T` inseridos por padrão. Nenhuma cópia é feita.

Se `T` não for DefaultInsertable em std::deque<T>, o comportamento é indefinido.

4) Constrói um `deque` com `count` cópias de elementos com o valor `value`. Se `T` não for CopyInsertable em std::deque<T>, o comportamento é indefinido. | (desde C++11)  
---|---  
  
5) Constrói um `deque` com o conteúdo do range ``first`, `last`)`. Cada iterator em `[`first`, `last`)` é desreferenciado exatamente uma vez. Se `InputIt` não satisfizer os requisitos de [LegacyInputIterator, a sobrecarga (4) é chamada em vez disso com os argumentos static_cast<size_type>(first), last e alloc. | (até C++11)  
---|---  
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer os requisitos de LegacyInputIterator. Se `T` não for EmplaceConstructible em std::deque<T> a partir de *first, o comportamento é indefinido. | (desde C++11)  
  
6) Constrói um `deque` com o conteúdo do range `rg`. Cada iterator em `rg` é desreferenciado exatamente uma vez.

Se `T` não for EmplaceConstructible em std::deque<T> a partir de *ranges::begin(rg), o comportamento é indefinido.

7-10) Constrói um `deque` com o conteúdo de `other`.

7) O construtor de cópia. O allocator é obtido como se chamando std::allocator_traits<Allocator>::  
select_on_container_copy_construction  
(other.get_allocator()).  | (desde C++11)  
---|---  
  
8) O move constructor. O allocator é obtido por move construction de other.get_allocator().

9) O mesmo que o construtor de cópia, exceto que `alloc` é usado como o allocator.

Se `T` não for CopyInsertable em std::deque<T>, o comportamento é indefinido.

10) O mesmo que o move constructor, exceto que `alloc` é usado como o allocator.

Se `T` não for MoveInsertable em std::deque<T>, o comportamento é indefinido.

11) Equivalente a deque(il.begin(), il.end(), alloc).

### Parâmetros

alloc  |  \-  |  allocator a ser usado para todas as alocações de memória deste container   
---|---|---  
count  |  \-  |  o tamanho do container   
value  |  \-  |  o valor para inicializar os elementos do container   
first, last  |  \-  |  o range de onde copiar os elementos   
other  |  \-  |  outro container a ser usado como fonte para inicializar os elementos do container   
init  |  \-  |  initializer list para inicializar os elementos do container   
rg  |  \-  |  um range compatível com container   
  
### Complexidade

1,2) Constante.

3,4) Linear em `count`.

5) Linear em std::distance(first, last).

6) Linear em ranges::distance(rg).

7) Linear em other.size().

8) Constante.

9) Linear em other.size().

10) Linear em other.size() se alloc != other.get_allocator(), caso contrário constante.

11) Linear em init.size().

### Exceções

Chamadas para Allocator::allocate podem lançar exceções.

### Notas

Após a move construction do container (sobrecarga (8)), referências, ponteiros e iterators (exceto o iterator `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está sob consideração via LWG issue 2321.

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---  
`__cpp_lib_containers_ranges` | `202202L` | (C++23) | Construção e inserção cientes de Ranges; sobrecarga (6)  
  
### Exemplo

Execute este código
```cpp 
    #include <deque>
    #include <iostream>
    #include <string>
     
    template<typename T>
    [std::ostream](<#/doc/io/basic_ostream>)& operator<<([std::ostream](<#/doc/io/basic_ostream>)& s, const [std::deque](<#/doc/container/deque>)<T>& v)
    {
        s.put('{');
        for (char comma[]{'\0', ' ', '\0'}; const auto& e : v)
            s << comma << e, comma[0] = ',';
        return s << "}\n";
    }
     
    int main()
    {
        // C++11 initializer list syntax:
        [std::deque](<#/doc/container/deque>)<[std::string](<#/doc/string/basic_string>)> words1{"the", "frogurt", "is", "also", "cursed"};
        [std::cout](<#/doc/io/cout>) << "1: " << words1;
     
        // words2 == words1
        [std::deque](<#/doc/container/deque>)<[std::string](<#/doc/string/basic_string>)> words2(words1.begin(), words1.end());
        [std::cout](<#/doc/io/cout>) << "2: " << words2;
     
        // words3 == words1
        [std::deque](<#/doc/container/deque>)<[std::string](<#/doc/string/basic_string>)> words3(words1);
        [std::cout](<#/doc/io/cout>) << "3: " << words3;
     
        // words4 is {"Mo", "Mo", "Mo", "Mo", "Mo"}
        [std::deque](<#/doc/container/deque>)<[std::string](<#/doc/string/basic_string>)> words4(5, "Mo");
        [std::cout](<#/doc/io/cout>) << "4: " << words4;
     
        const auto rg = {"cat", "cow", "crow"};
    #ifdef __cpp_lib_containers_ranges
        [std::deque](<#/doc/container/deque>)<[std::string](<#/doc/string/basic_string>)> words5([std::from_range](<#/doc/ranges/from_range>), rg); // overload (6)
    #else
        [std::deque](<#/doc/container/deque>)<[std::string](<#/doc/string/basic_string>)> words5(rg.begin(), rg.end()); // overload (5)
    #endif
        [std::cout](<#/doc/io/cout>) << "5: " << words5;
    }
```

Output: 
```
    1: {the, frogurt, is, also, cursed}
    2: {the, frogurt, is, also, cursed}
    3: {the, frogurt, is, also, cursed}
    4: {Mo, Mo, Mo, Mo, Mo}
    5: {cat, cow, crow}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---  
LWG 144 | C++98  | o requisito de complexidade da sobrecarga (5) era o mesmo que o da sobrecarga correspondente de std::vector | alterado para complexidade linear   
LWG 237 | C++98  | o requisito de complexidade da sobrecarga (5) era linear em first - last | alterado para linear em  
std::distance(first, last)  
LWG 438 | C++98  | a sobrecarga (5) chamaria a sobrecarga (4) apenas  
se `InputIt` fosse um tipo integral  | chama a sobrecarga (4) se `InputIt`  
não for um LegacyInputIterator  
LWG 2193 | C++11  | o construtor padrão era `explicit`  | tornado não `explicit`   
LWG 2210 | C++11  | a sobrecarga (3) não tinha um parâmetro allocator  | adicionado o parâmetro   
N3346 | C++11  | para a sobrecarga (3), os elementos no  
container eram value-initialized  | eles são default-inserted   
  
### Veja também

 assign |  atribui valores ao container   
(função membro pública)  
---|---  
 operator= |  atribui valores ao container   
(função membro pública)
```