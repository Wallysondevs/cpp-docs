# Cabeçalho da biblioteca padrão &lt;queue&gt;

Este cabeçalho faz parte da biblioteca de [containers](<#/doc/container>).

### Inclusões

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)
---|---
[ <initializer_list>](<#/doc/header/initializer_list>)(C++11) | Modelo de classe [std::initializer_list](<#/doc/utility/initializer_list>)

### Classes

[ queue](<#/doc/container/queue>) | adapta um container para fornecer uma fila (estrutura de dados FIFO)
(modelo de classe)
[ priority_queue](<#/doc/container/priority_queue>) | adapta um container para fornecer uma fila de prioridade
(modelo de classe)
[ std::uses_allocator<std::queue>](<#/doc/container/queue/uses_allocator>)(C++11) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)
[ std::uses_allocator<std::priority_queue>](<#/doc/container/priority_queue/uses_allocator>)(C++11) | especializa o trait de tipo [std::uses_allocator](<#/doc/memory/uses_allocator>)
(especialização de modelo de classe)

### Funções

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/queue/operator_cmp>)(C++20) | compara lexicograficamente os valores de duas `queue`s
(modelo de função)
[ std::swap(std::queue)](<#/doc/container/queue/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ std::swap(std::priority_queue)](<#/doc/container/priority_queue/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)

### Sinopse
```cpp
    #include <compare>
    #include <initializer_list>
    
    namespace std {
      // class template queue
      template<class T, class Container = deque<T>>
      class queue;
    
      template<class T, class Container>
      bool operator==(const queue<T, Container>& x, const queue<T, Container>& y);
      template<class T, class Container>
      bool operator!=(const queue<T, Container>& x, const queue<T, Container>& y);
      template<class T, class Container>
      bool operator<(const queue<T, Container>& x, const queue<T, Container>& y);
      template<class T, class Container>
      bool operator>(const queue<T, Container>& x, const queue<T, Container>& y);
      template<class T, class Container>
      bool operator<=(const queue<T, Container>& x, const queue<T, Container>& y);
      template<class T, class Container>
      bool operator>=(const queue<T, Container>& x, const queue<T, Container>& y);
      template<class T, three_way_comparable Container>
      compare_three_way_result_t<Container> operator<=>(const queue<T, Container>& x,
                                                        const queue<T, Container>& y);
    
      template<class T, class Container>
      void swap(queue<T, Container>& x, queue<T, Container>& y) noexcept(noexcept(x.swap(y)));
      template<class T, class Container, class Alloc>
      struct uses_allocator<queue<T, Container>, Alloc>;
    
      // formatter specialization for queue
      template<class CharT, class T, formattable<CharT> Container>
      struct formatter<queue<T, Container>, CharT>;
    
      // class template priority_queue
      template<class T,
               class Container = vector<T>,
               class Compare   = less<typename Container::value_type>>
      class priority_queue;
    
      template<class T, class Container, class Compare>
      void swap(priority_queue<T, Container, Compare>& x,
                priority_queue<T, Container, Compare>& y) noexcept(noexcept(x.swap(y)));
      template<class T, class Container, class Compare, class Alloc>
      struct uses_allocator<priority_queue<T, Container, Compare>, Alloc>;
    
      // formatter specialization for priority_queue
      template<class CharT, class T, formattable<CharT> Container, class Compare>
      struct formatter<priority_queue<T, Container, Compare>, CharT>;
    }
```

#### Modelo de classe [std::queue](<#/doc/container/queue>)
```cpp
    namespace std {
      template<class T, class Container = deque<T>>
      class queue
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
        queue()
          : queue(Container())
        {
        }
        explicit queue(const Container&);
        explicit queue(Container&&);
        template<class InputIter>
        queue(InputIter first, InputIter last);
        template<container-compatible-range<T> R>
        queue(from_range_t, R&& rg);
        template<class Alloc>
        explicit queue(const Alloc&);
        template<class Alloc>
        queue(const Container&, const Alloc&);
        template<class Alloc>
        queue(Container&&, const Alloc&);
        template<class Alloc>
        queue(const queue&, const Alloc&);
        template<class Alloc>
        queue(queue&&, const Alloc&);
        template<class InputIter, class Alloc>
        queue(InputIter first, InputIter last, const Alloc&);
        template<container-compatible-range<T> R, class Alloc>
        queue(from_range_t, R&& rg, const Alloc&);
    
        bool empty() const { return c.empty(); }
        size_type size() const { return c.size(); }
        reference front() { return c.front(); }
        const_reference front() const { return c.front(); }
        reference back() { return c.back(); }
        const_reference back() const { return c.back(); }
        void push(const value_type& x) { c.push_back(x); }
        void push(value_type&& x) { c.push_back(std::move(x)); }
        template<container-compatible-range<T> R>
        void push_range(R&& rg);
        template<class... Args>
        decltype(auto) emplace(Args&&... args)
        {
          return c.emplace_back(std::forward<Args>(args)...);
        }
        void pop() { c.pop_front(); }
        void swap(queue& q) noexcept(is_nothrow_swappable_v<Container>)
        {
          using std::swap;
          swap(c, q.c);
        }
      };
    
      template<class Container>
      queue(Container) -> queue<typename Container::value_type, Container>;
    
      template<class InputIter>
      queue(InputIter, InputIter) -> queue</*iter-value-type*/<InputIter>>;
    
      template<ranges::input_range R>
      queue(from_range_t, R&&) -> queue<ranges::range_value_t<R>>;
    
      template<class Container, class Allocator>
      queue(Container, Allocator) -> queue<typename Container::value_type, Container>;
    
      template<class InputIter, class Allocator>
      queue(InputIter, InputIter, Allocator)
        -> queue</*iter-value-type*/<InputIter>,
                 deque</*iter-value-type*/<InputIter>, Allocator>>;
    
      template<ranges::input_range R, class Allocator>
      queue(from_range_t, R&&, Allocator)
        -> queue<ranges::range_value_t<R>, deque<ranges::range_value_t<R>, Allocator>>;
    
      template<class T, class Container, class Alloc>
      struct uses_allocator<queue<T, Container>, Alloc>
        : uses_allocator<Container, Alloc>::type
      {};
    }
```

#### Modelo de classe [std::priority_queue](<#/doc/container/priority_queue>)
```cpp
    namespace std {
      template<class T,
               class Container = vector<T>,
               class Compare   = less<typename Container::value_type>>
      class priority_queue
      {
      public:
        using value_type      = typename Container::value_type;
        using reference       = typename Container::reference;
        using const_reference = typename Container::const_reference;
        using size_type       = typename Container::size_type;
        using container_type  = Container;
        using value_compare   = Compare;
    
      protected:
        Container c;
        Compare comp;
    
      public:
        priority_queue()
          : priority_queue(Compare())
        {
        }
        explicit priority_queue(const Compare& x)
          : priority_queue(x, Container())
        {
        }
        priority_queue(const Compare& x, const Container&);
        priority_queue(const Compare& x, Container&&);
        template<class InputIter>
        priority_queue(InputIter first, InputIter last, const Compare& x = Compare());
        template<class InputIter>
        priority_queue(InputIter first, InputIter last, const Compare& x, const Container&);
        template<class InputIter>
        priority_queue(InputIter first, InputIter last, const Compare& x, Container&&);
        template<container-compatible-range<T> R>
        priority_queue(from_range_t, R&& rg, const Compare& x = Compare());
        template<class Alloc>
        explicit priority_queue(const Alloc&);
        template<class Alloc>
        priority_queue(const Compare&, const Alloc&);
        template<class Alloc>
        priority_queue(const Compare&, const Container&, const Alloc&);
        template<class Alloc>
        priority_queue(const Compare&, Container&&, const Alloc&);
        template<class Alloc>
        priority_queue(const priority_queue&, const Alloc&);
        template<class Alloc>
        priority_queue(priority_queue&&, const Alloc&);
        template<class InputIter, class Alloc>
        priority_queue(InputIter, InputIter, const Alloc&);
        template<class InputIter, class Alloc>
        priority_queue(InputIter, InputIter, const Compare&, const Alloc&);
        template<class InputIter, class Alloc>
        priority_queue(InputIter, InputIter, const Compare&, const Container&, const Alloc&);
        template<class InputIter, class Alloc>
        priority_queue(InputIter, InputIter, const Compare&, Container&&, const Alloc&);
        template<container-compatible-range<T> R, class Alloc>
        priority_queue(from_range_t, R&& rg, const Compare&, const Alloc&);
        template<container-compatible-range<T> R, class Alloc>
        priority_queue(from_range_t, R&& rg, const Alloc&);
    
        bool empty() const { return c.empty(); }
        size_type size() const { return c.size(); }
        const_reference top() const { return c.front(); }
        void push(const value_type& x);
        void push(value_type&& x);
        template<container-compatible-range<T> R>
        void push_range(R&& rg);
        template<class... Args>
        void emplace(Args&&... args);
        void pop();
        void swap(priority_queue& q) noexcept(
          is_nothrow_swappable_v<Container>&& is_nothrow_swappable_v<Compare>)
        {
          using std::swap;
          swap(c, q.c);
          swap(comp, q.comp);
        }
      };
    
      template<class Compare, class Container>
      priority_queue(Compare, Container)
        -> priority_queue<typename Container::value_type, Container, Compare>;
    
      template<class InputIter,
               class Compare   = less</*iter-value-type*/<InputIter>>,
               class Container = vector</*iter-value-type*/<InputIter>>>
      priority_queue(InputIter, InputIter, Compare = Compare(), Container = Container())
        -> priority_queue</*iter-value-type*/<InputIter>, Container, Compare>;
    
      template<ranges::input_range R, class Compare = less<ranges::range_value_t<R>>>
      priority_queue(from_range_t, R&&, Compare = Compare())
        -> priority_queue<ranges::range_value_t<R>,
                          vector<ranges::range_value_t<R>>,
                          Compare>;
    
      template<class Compare, class Container, class Allocator>
      priority_queue(Compare, Container, Allocator)
        -> priority_queue<typename Container::value_type, Container, Compare>;
    
      template<class InputIter, class Allocator>
      priority_queue(InputIter, InputIter, Allocator)
        -> priority_queue</*iter-value-type*/<InputIter>,
                          vector</*iter-value-type*/<InputIter>, Allocator>,
                          less</*iter-value-type*/<InputIter>>>;
    
      template<class InputIter, class Compare, class Allocator>
      priority_queue(InputIter, InputIter, Compare, Allocator)
        -> priority_queue</*iter-value-type*/<InputIter>,
                          vector</*iter-value-type*/<InputIter>, Allocator>,
                          Compare>;
    
      template<class InputIter, class Compare, class Container, class Allocator>
      priority_queue(InputIter, InputIter, Compare, Container, Allocator)
        -> priority_queue<typename Container::value_type, Container, Compare>;
    
      template<ranges::input_range R, class Compare, class Allocator>
      priority_queue(from_range_t, R&&, Compare, Allocator)
        -> priority_queue<ranges::range_value_t<R>,
                          vector<ranges::range_value_t<R>, Allocator>,
                          Compare>;
    
      template<ranges::input_range R, class Allocator>
      priority_queue(from_range_t, R&&, Allocator)
        -> priority_queue<ranges::range_value_t<R>,
                          vector<ranges::range_value_t<R>, Allocator>>;
    
      // no equality is provided
    
      template<class T, class Container, class Compare, class Alloc>
      struct uses_allocator<priority_queue<T, Container, Compare>, Alloc>
        : uses_allocator<Container, Alloc>::type
      {};
    }
```