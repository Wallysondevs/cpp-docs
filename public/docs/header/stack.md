# Cabeçalho da biblioteca padrão &lt;stack&gt;

Este cabeçalho faz parte da biblioteca de [containers](<#/doc/container>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | template de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Classes

[ stack](<#/doc/container/stack>) | adapta um container para fornecer uma pilha (estrutura de dados LIFO)
(template de classe)
[ std::uses_allocator<std::stack>](<#/doc/container/stack/uses_allocator>)(C++11) | especializa o type trait [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de template de classe)

### Funções

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/stack/operator_cmp>)(C++20) | compara lexicograficamente os valores de duas `stack`s
(template de função)
[ std::swap(std::stack)](<#/doc/container/stack/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Sinopse
```cpp
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // class template stack
      template<class T, class Container = deque<T>>
      class stack;
    
      template<class T, class Container>
      bool operator==(const stack<T, Container>& x, const stack<T, Container>& y);
      template<class T, class Container>
      bool operator!=(const stack<T, Container>& x, const stack<T, Container>& y);
      template<class T, class Container>
      bool operator<(const stack<T, Container>& x, const stack<T, Container>& y);
      template<class T, class Container>
      bool operator>(const stack<T, Container>& x, const stack<T, Container>& y);
      template<class T, class Container>
      bool operator<=(const stack<T, Container>& x, const stack<T, Container>& y);
      template<class T, class Container>
      bool operator>=(const stack<T, Container>& x, const stack<T, Container>& y);
      template<class T, three_way_comparable Container>
      compare_three_way_result_t<Container> operator<=>(const stack<T, Container>& x,
                                                        const stack<T, Container>& y);
    
      template<class T, class Container>
      void swap(stack<T, Container>& x, stack<T, Container>& y) noexcept(noexcept(x.swap(y)));
      template<class T, class Container, class Alloc>
      struct uses_allocator<stack<T, Container>, Alloc>;
    
      // formatter specialization for stack
      template<class CharT, class T, formattable<CharT> Container>
      struct formatter<stack<T, Container>, CharT>;
    }
```

#### Template de classe [std::stack](<#/doc/container/stack>)
```cpp
    namespace std {
      template<class T, class Container = deque<T>>
      class stack
      {
      public:
        using value_type      = typename Container::value_type;
        using reference       = typename Container::reference;
        using const_reference = typename Container::const_reference;
        using size_type       = typename Container::size_type;
        using container_type  = Container;
    
      protected:
        Container c;
    
      public:
        stack()
          : stack(Container())
        {
        }
        explicit stack(const Container&);
        explicit stack(Container&&);
        template<class InputIter>
        stack(InputIter first, InputIter last);
        template<container-compatible-range<T> R>
        stack(from_range_t, R&& rg);
        template<class Alloc>
        explicit stack(const Alloc&);
        template<class Alloc>
        stack(const Container&, const Alloc&);
        template<class Alloc>
        stack(Container&&, const Alloc&);
        template<class Alloc>
        stack(const stack&, const Alloc&);
        template<class Alloc>
        stack(stack&&, const Alloc&);
        template<class InputIter, class Alloc>
        stack(InputIter first, InputIter last, const Alloc&);
        template<container-compatible-range<T> R, class Alloc>
        stack(from_range_t, R&& rg, const Alloc&);
    
        bool empty() const { return c.empty(); }
        size_type size() const { return c.size(); }
        reference top() { return c.back(); }
        const_reference top() const { return c.back(); }
        void push(const value_type& x) { c.push_back(x); }
        void push(value_type&& x) { c.push_back(std::move(x)); }
        template<container-compatible-range<T> R>
        void push_range(R&& rg);
        template<class... Args>
        decltype(auto) emplace(Args&&... args)
        {
          return c.emplace_back(std::forward<Args>(args)...);
        }
        void pop() { c.pop_back(); }
        void swap(stack& s) noexcept(is_nothrow_swappable_v<Container>)
        {
          using std::swap;
          swap(c, s.c);
        }
      };
    
      template<class Container>
      stack(Container) -> stack<typename Container::value_type, Container>;
    
      template<class InputIter>
      stack(InputIter, InputIter) -> stack</*iter-value-type*/<InputIter>>;
    
      template<ranges::input_range R>
      stack(from_range_t, R&&) -> stack<ranges::range_value_t<R>>;
    
      template<class Container, class Allocator>
      stack(Container, Allocator) -> stack<typename Container::value_type, Container>;
    
      template<class InputIter, class Allocator>
      stack(InputIter, InputIter, Allocator)
        -> stack</*iter-value-type*/<InputIter>,
                 deque</*iter-value-type*/<InputIter>, Allocator>>;
    
      template<ranges::input_range R, class Allocator>
      stack(from_range_t, R&&, Allocator)
        -> stack<ranges::range_value_t<R>, deque<ranges::range_value_t<R>, Allocator>>;
    
      template<class T, class Container, class Alloc>
      struct uses_allocator<stack<T, Container>, Alloc>
        : uses_allocator<Container, Alloc>::type
      {};
    }
```