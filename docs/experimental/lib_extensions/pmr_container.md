# Aliases de conveniência para containers usando alocadores polimórficos (TS de fundamentos da biblioteca)

Os seguintes aliases de conveniência e templates de alias para containers usando alocadores polimórficos são definidos no namespace `std::experimental::pmr`.

### Strings

Alias/template de alias | Alias para
Definido no cabeçalho `[<experimental/string>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/string&action=edit&redlink=1> "cpp/header/experimental/string \(page does not exist\)")`

```cpp
template<class CharT,
class Traits=std::char_traits<CharT>>
using basic_string =
polymorphic_allocator<CharT>>;
using string =
using wstring =
using u16string =
using u32string =
```

### Containers de sequência

Template de alias | Alias para
Definido no cabeçalho `[<experimental/vector>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/vector&action=edit&redlink=1> "cpp/header/experimental/vector \(page does not exist\)")`

```cpp
template<class T> using vector =
Definido no cabeçalho `<experimental/deque>")`
template<class T> using deque =
Definido no cabeçalho `<experimental/forward_list>")`
template<class T> using forward_list =
Definido no cabeçalho `<experimental/list>")`
template<class T> using list =
```

### Containers associativos

Template de alias | Alias para
Definido no cabeçalho `[<experimental/map>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/map&action=edit&redlink=1> "cpp/header/experimental/map \(page does not exist\)")`

```cpp
template<class Key, class T,
class Compare=std::less<Key>>
using map =
polymorphic_allocator<std::pair<const Key, T>>>;
template<class Key, class T,
class Compare=std::less<Key>>
using multimap =
polymorphic_allocator<std::pair<const Key, T>>>;
Definido no cabeçalho `<experimental/set>")`
template<class Key,
class Compare=std::less<Key>>
using set =
polymorphic_allocator<Key>>;
template<class Key,
class Compare=std::less<Key>>
using multiset =
polymorphic_allocator<Key>>;
```

### Containers associativos não ordenados

Template de alias | Alias para
Definido no cabeçalho `[<experimental/unordered_map>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/unordered_map&action=edit&redlink=1> "cpp/header/experimental/unordered map \(page does not exist\)")`

```cpp
template<class Key, class T,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>>
using unordered_map =
polymorphic_allocator<std::pair<const Key, T>>>;
template<class Key, class T,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>>
using unordered_multimap =
polymorphic_allocator<std::pair<const Key, T>>>;
Definido no cabeçalho `<experimental/unordered_set>")`
template<class Key,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>>
using unordered_set =
polymorphic_allocator<Key>>;
template<class Key,
class Hash = std::hash<Key>,
class Pred = std::equal_to<Key>>
using unordered_multiset =
polymorphic_allocator<Key>>;
```

### `match_results`

Alias/template de alias | Alias para
Definido no cabeçalho `[<experimental/regex>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/regex&action=edit&redlink=1> "cpp/header/experimental/regex \(page does not exist\)")`

```cpp
template<class BidirIt>
using match_results =
polymorphic_allocator<std::sub_match<BidirIt>>>;
using cmatch =
using wcmatch =
using smatch =
using wsmatch =
```
